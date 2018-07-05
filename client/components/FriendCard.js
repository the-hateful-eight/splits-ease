import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'

export const FriendCard = (props) => {
  return (
    <View>
      <Card>
      <Text>Name: {props.name}</Text>
      <Text>Email: {props.email}</Text>
      <Text>Phone: {props.phone}</Text>
      </Card>
    </View>
  )
}
