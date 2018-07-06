import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../components/Home';
import Login from '../components/Login';
import CreateUser from '../components/CreateUserForm';


const homeDrawerItem = createStackNavigator({
    Home: {
      screen: Home,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: (
        <Icon
          iconStyle={{ paddingLeft: 10 }}
          name='menu'
          color='white'
          onPress={() => navigation.openDrawer()}
          underlayColor='#3FA9F5'
        />
      ),
      headerRight: (
        <Icon
          iconStyle={{ paddingRight: 10 }}
          name='add-a-photo'
          color='white'
          onPress={() => navigation.navigate('Split')}
          underlayColor='#3FA9F5'
        />
      ),
      headerStyle: {
        backgroundColor: '#3FA9F5'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerBackTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white'
    })
  }
);

homeDrawerItem.navigationOptions = {
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="home"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default homeDrawerItem;