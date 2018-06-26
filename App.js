import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './client/store'
import Home from './client/components/Home'
import Login from './client/components/Login'
import ReceiptCamera from './client/components/ReceiptCamera'
import ReceiptForm from './client/components/ReceiptForm'
import ReceiptList from './client/components/ReceiptList'
import ReceiptPreview from './client/components/ReceiptPreview'

require('./secrets')

const Nav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
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
    },
    ReceiptPreview: {
      screen: ReceiptPreview,
      navigationoptions: {
        headerTitle: 'ReceiptPreview'
      }
    }
  },
  {
    initialRouteName: 'Login',
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
