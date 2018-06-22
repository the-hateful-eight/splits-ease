import React from 'react'
import Home from './client/components/Home'
import { createStackNavigator } from 'react-navigation'
import ReceiptCamera from './client/components/ReceiptCamera'
import ReceiptForm from './client/components/ReceiptForm'

require('./secrets')

const Nav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationoptions: {
        headerTitle: 'Home',
      },
    },
    ReceiptCamera: {
      screen: ReceiptCamera,
      navigationoptions: {
        headerTitle: 'Camera',
      },
    },
    ReceiptForm: {
      screen: ReceiptForm,
      navigationoptions: {
        headerTitle: 'ReceiptForm'
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    //Might need <Provider>
    return <Nav />
  }
}
