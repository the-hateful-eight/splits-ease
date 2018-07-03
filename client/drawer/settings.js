import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ReceiptList from '../components/ReceiptList';

const settingsDrawerItem = createStackNavigator({
  Settings: {
    screen: ReceiptList,
  },
});

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