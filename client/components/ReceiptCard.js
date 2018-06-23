import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class ReceiptCard extends React.Component{
    render() {
        const { merchantName, address, phone, date } = this.props.receipt
        return (
            <View>
                <Text>{merchantName}</Text>
                <Text>{address}</Text>
                <Text>{phone}</Text>
                <Text>{date}</Text>
            </View>
        )
    }
}


