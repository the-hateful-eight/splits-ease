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
          <View style={{ height: 10 }}/>
          <View style={{justifyContent: 'center'}}>
            <Button raised title='New Friend' icon={{ name: 'add' }} buttonStyle={styles.addBtn} onPress={() => this.props.navigation.navigate('AddFriend')} />
          </View>
          <View style={styles.bottomView}>
            <Button raised buttonStyle={styles.sendAllBtn} title="Send With Paypal" onPress={getPaypalAuth} />
            <Button raised buttonStyle={styles.sendWithoutBtn} title="Send Without Paypal" onPress={this.sendWithoutPayPal} />
        </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#3FA9F5',
    borderRadius: 5
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
    width: 120,
    justifyContent: 'flex-end',
  },
  sendAllBtn: {
    width: 150,
    borderRadius: 5,
    backgroundColor: '#0144af'
  },
  sendWithoutBtn: {
    width: 150,
    borderRadius: 5,
    backgroundColor: '#59af26'
  },
  friendBtn: {
    backgroundColor: '#3FA9F5',
    borderRadius: 2,
    borderWidth: 1,
    width: 70,
    borderColor: 'black',
  },
  bottomView: {
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100
  }
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
