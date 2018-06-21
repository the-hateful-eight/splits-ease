import React from 'react'
import { StyleSheet, Text, View, Button } from "react-native";

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to splits/EASE</Text>
        <Button title="Take a picture" onPress={() => this.props.navigation.navigate('ReceiptCamera')} />
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
  
