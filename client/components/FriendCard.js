import React from 'react'
import { Text, View } from 'react-native'

export const FriendCard = (props) => {
  return (
    <View>
      <Text>Name: {props.name}</Text>
      <Text>Email: {props.email}</Text>
      <Text>Phone: {props.phone}</Text>
    </View>
  )
}
