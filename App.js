import React from "react";
import Home from "./Components/Home";
import { createStackNavigator } from "react-navigation";
import ReceiptCamera from "./Components/ReceiptCamera";

const Nav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationoptions: {
        headerTitle: "Home"
      }
    },
    ReceiptCamera: {
      screen: ReceiptCamera,
      navigationoptions: {
        headerTitle: "Camera"
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    //Might need <Provider>
    return <Nav />;
  }
}
