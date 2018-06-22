import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import Expo, { Camera, Permissions, FileSystem } from "expo";
import axios from "axios";
import RNFetchBlob from "react-native-fetch-blob";
const { manifest } = Expo.Constants;

// const getBinary = base64Image => {
//   const binaryImg = atob(base64Image);
//   const length = binaryImg.length;
//   const ab = new ArrayBuffer(length);
//   const ua = new Uint8Array(ab);
//   for (let i = 0; i < length; i++) {
//     ua[i] = binaryImg.charCodeAt(i);
//   }

//   return ab;
// };

const encodePhoto = photo => {
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  RNFetchBlob.config({
    fileCache: true
  })
    .fetch("GET", photo)
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile("base64");
    })
    .then(base64Data => {
      // here's base64 encoded image
      console.log(base64Data);
      // remove the file from storage
      fs.unlink(imagePath);
    });
  }

export default class ReceiptCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    photo: ""
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "photos"
    ).catch(e => {
      console.log(e, "Directory exists");
    });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        base64: true
      });
      this.setState({});
      const encoded = encodePhoto(photo);
      console.log(encoded)
      const ip = manifest.packagerOpts.dev
        ? manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:1337`)
        : `localhost:1337`;
      // const parsed = await axios.post(`http://${ip}/api/transactions`, encoded);
      // console.log("Photo! ", parsed);
    }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
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
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <Button title="Capture" onPress={() => this.snap()} />
            </View>
          </Camera>
        </View>
      );
    }
  }
}
