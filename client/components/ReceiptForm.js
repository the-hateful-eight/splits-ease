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
import { getUserFriends } from '../store/user'
import ModalDropdown from 'react-native-modal-dropdown'

const dummyData = [
  {
    item: 'burger',
    price: '$1.50',
  },
  {
    item: 'ramen',
    price: '$13.00',
  },
  {
    item: 'Mountain Dew',
    price: '$1.50',
  },
  {
    item: 'falafel',
    price: '$6.00',
  },
]

class ReceiptForm extends React.Component {
  state = {
    data: [],
    friends: []
  }

  renderFriends() {
    console.log('PROPS IN RENDER ARE',this.props)
  }

  // UNSAFE_componentWillMount() {
  //   console.log('PROPS USER IS',this.props.user.id)
  //   this.props.getUserFriends(this.props.user.id)
  // }

  componentDidMount() {
    this.setState({ data: this.props.navigation.state.params.data })
    console.log('PROPS USER IS',this.props.user.id)
    this.props.getUserFriends(this.props.user.id)
  }

  render() {
    const data = this.state.data
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
  console.log('STATE in MSTP is',state)
  return{
    user: state.user.user,
    userFriends: state.userFriends
  }
}

const mapDispatchToProps = dispatch => ({
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient)),
  getUserFriends: (id) => dispatch(getUserFriends(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptForm)
