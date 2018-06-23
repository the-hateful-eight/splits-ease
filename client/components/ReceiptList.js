import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class ReceiptList extends React.Component{
  state = {
    user: {},
    receipts: []
  }

  render(){
    return(
      <View>
          <Text>Receipts should be here, yo!</Text>
      </View>
    )
  }
}


