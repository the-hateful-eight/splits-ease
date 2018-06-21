import React from "react";
import Home from "./Home";
import { createStackNavigator } from "react-navigation";
import ReceiptCamera from "./ReceiptCamera";

const Nav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationoptions: {
        headerTitle: "Home"
      }
    },
    Camera: {
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
