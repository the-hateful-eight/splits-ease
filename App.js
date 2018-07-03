import React from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation'
import { Provider } from 'react-redux'
import { View, Image, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import store from './client/store'
import Login from './client/components/Login'
import Home from './client/drawer/home'
import Friends from './client/drawer/friends'
import Receipts from './client/drawer/receipts'
import Split from './client/drawer/split'
import Settings from './client/drawer/settings'

require('./secrets')

const SCREEN_WIDTH = Dimensions.get('window').width;

const Drawer = createDrawerNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      }
    },
    Home: {
      screen: Home
    },
    Friends: {
      screen: Friends
    },
    Split: {
      screen: Split
    },
    Receipts: {
      screen: Receipts
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: 'Login',
    contentOptions: {
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Drawer />
      </Provider>
    )
  }
}
