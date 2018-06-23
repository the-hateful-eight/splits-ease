import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './store'
import Home from './client/components/Home'
import ReceiptCamera from './client/components/ReceiptCamera'
import ReceiptForm from './client/components/ReceiptForm'
import ReceiptList from './client/components/ReceiptList'


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
    },
    ReceiptList: {
      screen: ReceiptList,
      navigationoptions: {
        headerTitle: 'ReceiptList'
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    )
  }
}
