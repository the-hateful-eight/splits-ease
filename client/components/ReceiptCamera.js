import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import Expo, { Camera, Permissions, FileSystem } from 'expo'
import axios from 'axios'
const { manifest } = Expo.Constants

export default class ReceiptCamera extends React.Component {
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
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + 'photos'
    ).catch(e => {
      console.log(e, 'Directory exists')
    })
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.1,
        base64: true,
      })
      console.log('PHOTO CAPTURED!!!')
      this.setState({ photo })
    }
  }

  analyze = async () => {
    const photo = this.state.photo
    if (!photo.base64){
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
          image: photo.base64,
        }).then(res => res.data)
        console.log(parsed)
        console.log('Photo! ', parsed.textAnnotations[0].description)
      } catch (err) {
        console.log(err)
      }
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
              style={{
                // flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <Button style={styles.button} title="Capture" onPress={() => this.snap()} />
              <Button style={styles.button} title="Analyze" onPress={() => this.analyze()} />
            </View>
          </Camera>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50
  }
})
