import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ReceiptCamera from '../components/ReceiptCamera';
import ReceiptPreview from '../components/ReceiptPreview';
import ReceiptForm from '../components/ReceiptForm';
import AddFriend from '../components/AddFriend'
const splitDrawerItem = createStackNavigator({
  Camera: {
    screen: ReceiptCamera,
    navigationOptions: ({ navigation }) => ({
      title: 'Camera',
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
  ReceiptPreview: {
    screen: ReceiptPreview,
    navigationOptions: {
      headerTitle: 'Receipt Preview'
  }
  },
  ReceiptForm: {
    screen: ReceiptForm,
    navigationOptions: {
      headerTitle: 'Receipt Form'
  }
  },
  AddFriend: {
    screen: AddFriend,
    navigationOptions: {
      headerTitle: 'Add Friends'
  }
  }
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
splitDrawerItem.navigationOptions = {
  drawerLabel: 'Capture Receipt',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="add-a-photo"
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

export default splitDrawerItem;
