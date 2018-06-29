import React from 'react'
import { createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import { Provider } from 'react-redux'
import { View, Image, Dimensions } from 'react-native'

import store from './client/store'
import Home from './client/components/Home'
import Login from './client/components/Login'
import ReceiptCamera from './client/components/ReceiptCamera'
import ReceiptForm from './client/components/ReceiptForm'
import ReceiptList from './client/components/ReceiptList'
import ReceiptPreview from './client/components/ReceiptPreview'
import CreateUserForm from './client/components/CreateUserForm'

require('./secrets')

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./assets/splits-ease-logo.png')}
        style={{ width: SCREEN_WIDTH * 0.57 }}
        resizeMode="contain"
      />
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

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
    },
    CreateUserForm: {
      screen: CreateUserForm,
      navigationoptions: {
        headerTitle: 'CreateUserForm'
      }
    },
    FriendsList: {
      screen: FriendsList,
      navigationoptions: {
        headerTitle: 'FriendsList'
      }
    }
  },
  {
    initialRouteName: 'Login',
  }
)

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
    ReceiptCamera: {
      screen: ReceiptCamera
    },
    ReceiptForm: {
      screen: ReceiptForm
    },
    ReceiptList: {
      screen: ReceiptList
    },
    ReceiptPreview: {
      screen: ReceiptPreview
    },
    CreateUserForm: {
      screen: CreateUserForm
    }
  },
  {
    initialRouteName: 'Login',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: SCREEN_WIDTH * 0.8,
    contentComponent: CustomDrawerContentComponent,
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    )
  }
}
