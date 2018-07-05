import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class ReceiptCard extends React.Component{
    render() {
        const { vendor, vendorAddress, createdAt, updatedAt } = this.props.receipt
        return (
            <View>
                <Text>{'Vendor: ' + vendor}</Text>
                <Text>{vendorAddress ? ('Address: ' + vendorAddress) : 'Address: none'}</Text>
                <Text>{('Created: ' + createdAt)}</Text>
                <Text>{('Updated: ' + updatedAt)}</Text>
            </View>
        )
    }
}


