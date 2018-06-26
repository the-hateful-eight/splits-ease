import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import axios from 'axios'
const { manifest } = Expo.Constants

export default class ReceiptPreview extends React.Component {
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
        console.log(parsed)
        console.log('Photo! ', parsed.textAnnotations[0].description)
      } catch (err) {
        console.log(err)
      }
    }
  }

  render () {
    let src = {uri: 'data:image/png;base64,' + this.state.image}
    return (
      <View>
        <Button style={styles.button} title="Analyze" onPress={() => this.analyze()} />
        <Image source={src} style={styles.img} resizeMode='center'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    height: 530,
    width: 360
  }
});
