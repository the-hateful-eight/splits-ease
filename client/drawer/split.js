import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ReceiptCamera from '../components/ReceiptCamera';
import ReceiptPreview from '../components/ReceiptPreview';
import ReceiptForm from '../components/ReceiptForm';
import AddFriend from '../components/AddFriend';

const splitDrawerItem = createStackNavigator({
  Camera: {
    screen: ReceiptCamera,
    navigationOptions: ({ navigation }) => ({
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
    screen: ReceiptPreview
  },
  ReceiptForm: {
    screen: ReceiptForm,
  },
  AddFriend: {
    screen: AddFriend
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

// const splitDrawerItem = createBottomTabNavigator({
//     Camera: {
//       screen: ReceiptCamera,
//       navigationOptions: {
//           tabBarLabel: 'Camera',
//           tabBarIcon: ({ tintColor, focused }) => (
//             <Icon
//               name='camera_alt'
//               size={30}
//               type="material"
//               color={tintColor}
//             />
//           ),
//         },
//     },
//     ReceiptPreview: {
//       screen: ReceiptPreview,
//       navigationOptions: {
//           tabBarLabel: 'Analyze',
//           tabBarIcon: ({ tintColor, focused }) => (
//             <Icon
//               name='bar_chart'
//               size={30}
//               type="material"
//               color={tintColor}
//             />
//           ),
//         },
//     },
//     ReceiptForm: {
//       screen: ReceiptForm,
//       navigationOptions: {
//           tabBarLabel: 'Form',
//           tabBarIcon: ({ tintColor, focused }) => (
//             <Icon
//               name='storage'
//               size={30}
//               type="material"
//               color={tintColor}
//             />
//           ),
//         },
//     }
//   })

//   splitDrawerItem.navigationOptions = {
//     drawerLabel: 'Split!',
//     drawerIcon: ({ tintColor }) => (
//       <Icon
//         name="camera"
//         size={30}
//         iconStyle={{
//           width: 30,
//           height: 30
//         }}
//         type="material"
//         color={tintColor}
//       />
//     ),
//   };

export default splitDrawerItem;
