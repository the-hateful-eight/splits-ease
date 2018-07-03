import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ReceiptList from '../components/ReceiptList';

const receiptsDrawerItem = createStackNavigator({
  Receipts: {
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

receiptsDrawerItem.navigationOptions = {
  drawerLabel: 'Receipts',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="receipt"
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

export default receiptsDrawerItem;