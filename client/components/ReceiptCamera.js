import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
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
              style={{
                // flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <Button style={styles.button} title="Capture" onPress={() => this.snap()} />
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

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items))
})

export default connect(null, mapDispatchToProps)(ReceiptCamera)
