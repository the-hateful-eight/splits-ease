import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { setItems, assignItem, unassignItem } from '../store/items'
import ModalDropdown from 'react-native-modal-dropdown'

class ReceiptForm extends React.Component {
  constructor(){
    super()
    this.renderFriends = this.renderFriends.bind(this)
    this.selectFriend = this.selectFriend.bind(this)
  }

  selectFriend = (idx, val) => {
    this.props.assignItem(idx, val)
  }

  renderFriends() {
    return this.props.userFriends.map(friend => friend.name)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.items.map(item => {
            return (
              <View key={item.id} style={styles.lineItem}>
                <ScrollView horizontal={true}>
                  <FormInput
                    key={item.id}
                    style={styles.merchantText}
                    id={item.id}
                    inputStyle={styles.input}
                  >
                    {item.item}
                  </FormInput>
                </ScrollView>
                <FormInput
                  key={item.id}
                  style={styles.merchantText}
                  id={item.id}
                  containerStyle={styles.input}
                >
                  {item.price}
                </FormInput>
                <ModalDropdown
                  defaultValue="Add Friend"
                  style={styles.friendBtn}
                  textStyle={{ textAlign: 'center' }}
                  dropdownStyle={{ width: 70 }}
                  options={this.renderFriends()}
                  onSelect={this.selectFriend}
                />
              </View>
            )
          })}
          <View>
            <Button style={styles.sendAllBtn} title="Send All" />
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
    justifyContent: 'space-evenly',
  },
  merchantText: {
    justifyContent: 'flex-start',
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderColor: 'black',
    borderRadius: 2,
    width: 100,
    height: 30,
  },
  addItemBtn: {
    width: 50,
    justifyContent: 'flex-end',
  },
  sendAllBtn: {
    width: 100,
  },
  friendBtn: {
    backgroundColor: '#b3e6ff',
    borderRadius: 2,
    borderWidth: 1,
    width: 70,
    borderColor: 'black',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userFriends: state.user.userFriends,
    items: state.items
  }
}

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items)),
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient)),
  unassignItem: index => dispatch(unassignItem(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptForm)
