import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Expo, { Camera, Permissions, FileSystem } from 'expo'
import { setItems } from '../store/items'
import { connect } from 'react-redux'

class ReceiptCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: {},
  }

  async UNSAFE_componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  UNSAFE_componentDidMount() {
    this.props.navigation.navigate('DrawerClose')
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.log(e, 'Directory exists')
    })
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.4,
        base64: true,
      })
      console.log('PHOTO CAPTURED!!!')
      this.setState({ photo })
      this.props.navigation.navigate('ReceiptPreview', {image: this.state.photo.base64})
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => (this.camera = ref)}
          >
            <View
              style={styles.bottomView}
            >
              <Button buttonStyle={styles.captureBtn} title="Capture" onPress={() => this.snap()} />
            </View>
          </Camera>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  bottomView: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    position: 'absolute'
  },
  captureBtn: {
    backgroundColor: '#3FA9F5',
    // width: '90%',
    borderRadius: 5
  }
})

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items))
})

export default connect(null, mapDispatchToProps)(ReceiptCamera)
