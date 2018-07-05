import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Settings from '../components/Settings';

const settingsDrawerItem = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerLeft: (
          <Icon
            iconStyle={{ paddingLeft: 10 }}
            name='menu'
            color='white'
            onPress={() => navigation.openDrawer()}
            underlayColor='#3FA9F5'
          />
        ),
      })
  },
},
{
  navigationOptions: ({ navigation }) => ({
    headerRight: (
      <Icon
        iconStyle={{ paddingRight: 10 }}
        name='home'
        color='white'
        onPress={() => navigation.navigate('Home')}
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
})

settingsDrawerItem.navigationOptions = {
  drawerLabel: 'Settings',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="settings"
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

export default settingsDrawerItem;