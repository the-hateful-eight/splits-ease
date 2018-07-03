import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FriendsList from '../components/FriendsList'
import AddFriend from '../components/AddFriend'
import EditForm from '../components/EditForm'

const friendsDrawerItem = createStackNavigator({
    FriendsList: {
        screen: FriendsList
    },
    AddFriend: {
        screen: AddFriend
    },
    EditForm: {
        screen: EditForm
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