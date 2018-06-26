import React from 'react'
import { StyleSheet, Text, View, Button } from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to SPLITS/ease</Text>
        <Button title="Take a picture" onPress={() => this.props.navigation.navigate('ReceiptCamera')} />
        <Button title="Receipt Form" onPress={() => this.props.navigation.navigate('ReceiptForm')} />
        <Button title="Receipt List" onPress={() => this.props.navigation.navigate('ReceiptList')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
  });

