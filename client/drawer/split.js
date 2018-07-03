import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ReceiptCamera from '../components/ReceiptCamera';
import ReceiptPreview from '../components/ReceiptPreview';
import ReceiptForm from '../components/ReceiptForm'; 

const splitDrawerItem = createStackNavigator({
  Camera: {
    screen: ReceiptCamera
  },
  ReceiptPreview: {
    screen: ReceiptPreview
  },
  ReceiptForm: {
    screen: ReceiptForm,
  }
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

splitDrawerItem.navigationOptions = {
  drawerLabel: 'Split!',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="camera"
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