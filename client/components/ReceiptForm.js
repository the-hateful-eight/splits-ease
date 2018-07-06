import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Linking } from 'react-native'
import Expo from 'expo'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { connect } from 'react-redux'
import { setItems, assignItem, unassignItem } from '../store/items'
import ModalDropdown from 'react-native-modal-dropdown'
import { getPaypalAuth, sendReceipt } from '../store/user'

class ReceiptForm extends React.Component {

  selectFriend = (itemIdx, friendIdx, val) => {
    if (val === 'Choose'){
      this.props.unassignItem(itemIdx)
    } else {
    this.props.assignItem(itemIdx, this.props.userFriends[friendIdx])
    }
    console.log('ITEMS ARE HERE', this.props.items)
  }

  componentDidMount = () => {
    Linking.addEventListener('url', (event) => {
      Expo.WebBrowser.dismissBrowser()
      let url = Expo.Linking.parse(event.url)
      if (url.queryParams.code){
        sendReceipt(this.props.items, url.queryParams.code)
      }
    })
  }

  sendWithoutPayPal = () => {
    sendReceipt(this.props.items)
  }

  renderFriends = () => {
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
                  options={[ 'Choose',...this.renderFriends()]}
                  onSelect={(idx, val) => {
                    this.selectFriend(item.id, idx-1, val)
                  }}
                />
              </View>
            )
          })}
          <View>
            <Button style={styles.sendAllBtn} title="Send All" onPress={getPaypalAuth} />
            <Button style={styles.sendAllBtn} title="Send Without Paypal" onPress={this.sendWithoutPayPal} />
          </View>
          <View style={styles.bottomView}>
          <Button icon={{ name: 'add' }} buttonStyle={styles.addBtn} onPress={() => this.props.navigation.navigate('AddFriend')} />
        </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: 'red',
    width: '100%'
  },
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
    backgroundColor: '#3FA9F5',
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
