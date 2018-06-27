import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import assignItem from '../store/items'
import ModalDropdown from 'react-native-modal-dropdown';

const dummyData = [
  {
    item: 'burger',
    price: '$1.50'
  },
  {
    item: 'ramen',
    price: '$13.00'
  },
  {
    item: 'Mountain Dew',
    price: '$1.50'
  },
  {
    item: 'falafel',
    price: '$6.00'
  }
];

const dummyFriends = [
  {
    name: 'Bob',
    email: 'bob@email.com',
    phone: null
  },
  {
    name: 'Jim',
    email: null,
    phone: '555-555-1234'
  },
  {
    name: 'Sarah',
    email: 'sarah@email.com',
    phone: '555-555-6789'
  },
]

class ReceiptForm extends React.Component {
  state = {
    data: []
  };

  componentDidMount () {
    // this.setState({data: this.props.navigation.state.params.data})
    this.setState({data: dummyData})
  }

  render () {
    const data = this.state.data
    return (
      <View style={styles.container}>
      <ScrollView>
      {data.map(item => {
        return (
          <View key={item.id} style={styles.lineItem}>
            <ScrollView key={item.id} horizontal={true} >
              <FormInput key={item.id} style={styles.merchantText} id={item.id} inputStyle={styles.input}>
              {item.item}
              </FormInput>
            </ScrollView>
          <FormInput key={item.id} style={styles.merchantText} id={item.id} containerStyle={styles.input}>
          {item.price}
          </FormInput>
          <ModalDropdown defaultValue='Add Friend' style={styles.friendBtn} textStyle={{textAlign: 'center'}} dropdownStyle={styles.dropDownStyle} options={['option 1', ...dummyFriends.map(friend => friend.name)]} />
          </View>
        )
      })}
        <View>
          <Button style={styles.sendAllBtn} title='Send All' />
        </View>
      </ScrollView>
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
    justifyContent: 'flex-start'
  },
  lineItem: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    borderColor: 'black',
    borderRadius: 2,
    width: 100,
    height: 30
  },
  addItemBtn: {
    width: 50,
    justifyContent: 'flex-end'
  },
  sendAllBtn: {
    width: 100
  },
  friendBtn: {
    backgroundColor: '#b3e6ff',
    borderRadius: 2,
    borderWidth: 1,
    width: 70,
    borderColor: 'black'
  },
  dropDownStyle: {
    width: 70,
    backgroundColor: '#b3e6ff'
  }
});

const mapStateToProps = state => ({
  friends: state.user.UserFriends
})

const mapDispatchToProps = dispatch => ({
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptForm)
