import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";
import { connect } from "react-redux";
import { setItems } from "../store/items";
const { manifest } = Expo.Constants;

class ReceiptPreview extends React.Component {
  state = {
    allowEdit: false,
    image: ""
  };

  componentDidMount() {
    this.setState({ image: this.props.navigation.state.params.image });
  }

  analyze = async () => {
    const photo = this.state.image;
    if (!photo) {
      return <Text>NO PHOTO TO ANALYZE!!!</Text>;
    } else {
      const ip = manifest.packagerOpts.dev
        ? manifest.debuggerHost
            .split(`:`)
            .shift()
            .concat(`:1337`)
        : `localhost:1337`;
      try {
        const parsed = await axios
          .post(`http://${ip}/api/receipts`, {
            image: photo
          })
          .then(res => res.data);
        console.log("Photo! ", parsed.textAnnotations[0].description);
        const positions = parsed.textAnnotations.slice(1);
        let lines = {};
        let bottomLeft, bottomRight, left, lineDetected, text, box;
        for (let i = 0; i < positions.length - 2; i++) {
          box = positions[i];
          lineDetected = false;
          if (
            !isNaN(box.description) &&
            positions[i + 1].description === "." &&
            !isNaN(positions[i + 2].description)
          ) {
            bottomLeft = box.boundingPoly.vertices[3];
            bottomRight = positions[i + 2].boundingPoly.vertices[2];
            text =
              box.description +
              positions[i + 1].description +
              positions[i + 2].description;
            i += 2;
          } else {
            [bottomRight, bottomLeft] = box.boundingPoly.vertices.slice(2);
            text = box.description;
          }
          left =
            bottomLeft.y +
            (bottomLeft.x / (bottomRight.x - bottomLeft.x)) *
              (bottomLeft.y - bottomRight.y);
          Object.keys(lines).forEach(line => {
            if (Math.abs(left - line) <= 100 && !lineDetected) {
              lines[line].push(text);
              lineDetected = true;
            }
          });
          if (!lineDetected) lines[left] = [text];
          console.log(left, text);
        }
        let items = [];
        let i = 0;
        Object.values(lines).forEach(line => {
          let item = line.join(" ");
          item = item
            .replace(" . ", ".")
            .replace(/[^.\w\s]/g, "")
            .trim();
          item = item.split(/(\d+\.\d\d(?:[^\d%]|$))/);
          console.log(item);
          if (item.length > 1) {
            if (item[0]) {
              items.push({ id: i++, item: item[0], price: item[1] });
            } else {
              items.push({ id: i++, item: item[2], price: item[1] });
            }
          }
        });
        this.props.setItems(items);
        this.props.navigation.navigate("ReceiptForm", { data: items });
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    let src = { uri: "data:image/png;base64," + this.state.image };
    return (
      <View>
        <Button
          style={styles.button}
          title="Analyze"
          onPress={() => this.analyze()}
        />
        <Image source={src} style={styles.img} resizeMode="center" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 530,
    width: 360
  }
});

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items))
});

export default connect(
  null,
  mapDispatchToProps
)(ReceiptPreview);
