import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ReceiptList from '../components/ReceiptList';

const settingsDrawerItem = createStackNavigator({
  Settings: {
    screen: ReceiptList,
  },
},
{
  navigationOptions: {
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
  }
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