import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class ReceiptForm extends React.Component {
  state = {
    merchantName: '',
    address: '',
    phone: '',
    date: ''
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.merchantText}>
          <Text>NAME OF MERCHANT HERE</Text>
          <Text>MERCHANT ADDRESS HERE</Text>
          <Text>MERCHANT PHONE HERE</Text>
          <Text>DATE</Text>
          <View>
            <View style={styles.input}>
              <Button style={styles.addItemBtn} title='+' />
              <FormLabel>LINE ITEM NAME - AMOUNT</FormLabel>
            </View>
            <FormInput />
          </View>
        </View>
        <View>
          <Button>Send All</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  merchantText: {
    alignItems: 'center'
  },
  lineItem: {
    flex: 1,
    flexDirection: 'row'
  },
  input: {
    flexDirection: 'row'
  },
  addItemBtn: {
    width: 50
  }
});

