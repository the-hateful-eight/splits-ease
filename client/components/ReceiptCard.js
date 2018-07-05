import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class ReceiptCard extends React.Component{
    render() {
        const { vendor, vendorAddress, createdAt, updatedAt } = this.props.receipt
        return (
            <View style={styles.card}>
                <Text>{'Vendor: ' + vendor}</Text>
                <Text>{vendorAddress ? ('Address: ' + vendorAddress) : 'Address: none'}</Text>
                <Text>{('Created: ' + createdAt)}</Text>
                <Text>{('Updated: ' + updatedAt)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderStyle: 'solid',
        borderWidth: 2
    }
})
