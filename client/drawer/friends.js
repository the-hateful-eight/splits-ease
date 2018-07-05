import React from 'react';
import { createStackNavigator, Header } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FriendsList from '../components/FriendsList'
import AddFriend from '../components/AddFriend'
import EditForm from '../components/EditForm'

const friendsDrawerItem = createStackNavigator({
    FriendsList: {
        screen: FriendsList,
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
    AddFriend: {
        screen: AddFriend
    },
    EditForm: {
        screen: EditForm
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
    }
);

friendsDrawerItem.navigationOptions = {
    drawerLabel: 'Friends',
    drawerIcon: ({ tintColor }) => (
        <Icon
            name="people"
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

export default friendsDrawerItem;