import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import axios from 'axios'
import { connect } from 'react-redux'
import { setItems } from '../store/items'
const { manifest } = Expo.Constants

class ReceiptPreview extends React.Component {
  state = {
    allowEdit: false,
    image: ''
  }

  componentDidMount () {
    this.setState({image: this.props.navigation.state.params.image})
  }

  analyze = async () => {
    const photo = this.state.image
    if (!photo){
      return (
        <Text>NO PHOTO TO ANALYZE!!!</Text>
      )
    } else {
    const ip = manifest.packagerOpts.dev
        ? manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:1337`)
        : `localhost:1337`
      try {
        const parsed = await axios.post(`http://${ip}/api/receipts`, {
          image: photo,
        }).then(res => res.data)
        console.log('Photo! ', parsed.textAnnotations[0].description)
        let text = parsed.textAnnotations[0].description
        text = text.replace(/\n/g, " ").replace(/[^.\w\s]/g, "")
        let lines = text.split(/(\d+\.\d\d)/).slice(0, -1)
        let items = []
        for (let i = 0; i < lines.length; i = i + 2){
          lines[i] = lines[i].trim().split(" ").slice(-5).join(" ")
          items.push({id: i, item: lines[i], price: lines[i + 1]})
        }
        console.log(items)
        this.props.setItems(items)
        this.props.navigation.navigate('ReceiptForm', {data: items})
      } catch (err) {
        console.log(err)
      }
    }
  }

  render () {
    let src = {uri: 'data:image/png;base64,' + this.state.image}
    return (
      <View style={styles.container}>
      <Image source={src} style={styles.img} resizeMode='center'/>
      <View style={styles.bottomView}>
        <Button buttonStyle={styles.button} title="Analyze" onPress={() => this.analyze()} />
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomView: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    position: 'absolute'
  },
  button: {
    backgroundColor: 'blue',
    width: '100%'
  },
  img: {
    height: 530,
    width: 360
  }
});

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items))
});

export default connect(null, mapDispatchToProps)(ReceiptPreview)
