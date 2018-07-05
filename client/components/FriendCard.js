import React from 'react'
import { Text, View } from 'react-native'

export const FriendCard = (props) => {
  return (
    <View>
      {/* <Text>Name: {props.name}</Text> */}
      <Text>{props.email}</Text>
      <Text>{props.phone}</Text>
    </View>
  )
}
