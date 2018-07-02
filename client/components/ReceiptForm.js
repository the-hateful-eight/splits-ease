import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { connect } from 'react-redux'
import assignItem from '../store/items'
import ModalDropdown from 'react-native-modal-dropdown'

class ReceiptForm extends React.Component {
  constructor(){
    super()
    this.state = {
      data: []
    }
    this.renderFriends = this.renderFriends.bind(this)
  }

  renderFriends() {
    return this.props.userFriends.map(friend => friend.name)
  }

  // componentDidMount() {
  //   this.setState({ data: this.props.navigation.state.params.data })
  // }

  render() {
    const data = this.props.items
    // console.log('DATA IS HERE!!!', data)
    // if (!data.length){

    // }
    return (
      <View style={styles.container}>
        <ScrollView>
          {data.map(item => {
            return (
              <View key={item.id} style={styles.lineItem}>
                <ScrollView horizontal={true}>
                  <FormInput
                    key={item.id}
                    style={styles.merchantText}
                    id={item.id}
                    inputStyle={styles.input}
                  >
                    ITEM {item.item}
                  </FormInput>
                </ScrollView>
                <FormInput
                  key={item.id}
                  style={styles.merchantText}
                  id={item.id}
                  containerStyle={styles.input}
                >
                  PRICE {item.price}
                </FormInput>
                <ModalDropdown
                  defaultValue="Add Friend"
                  style={styles.friendBtn}
                  textStyle={{ textAlign: 'center' }}
                  dropdownStyle={{ width: 70 }}
                  options={this.renderFriends()}
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
  return{
    user: state.user.user,
    userFriends: state.user.userFriends,
    items: state.items
  }
}

const mapDispatchToProps = dispatch => ({
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptForm)
