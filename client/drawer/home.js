import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../components/Home';
import ReceiptCamera from '../components/ReceiptCamera'
import ReceiptForm from '../components/ReceiptForm'
import ReceiptList from '../components/ReceiptList'
import ReceiptPreview from '../components/ReceiptPreview'
import CreateUserForm from '../components/CreateUserForm'
import FriendsList from '../components/FriendsList'
import AddFriend from '../components/AddFriend'

const homeDrawerItem = createStackNavigator(
    {
        Home: {
          screen: Home
      }
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