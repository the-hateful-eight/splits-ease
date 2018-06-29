<<<<<<< HEAD
import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
=======
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
>>>>>>> master
import {
  Button,
  FormLabel,
  FormInput,
<<<<<<< HEAD
  FormValidationMessage,
} from 'react-native-elements'
import { connect } from 'react-redux'
import assignItem from '../store/items'
import getUserFriends from '../store/user'
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
=======
  FormValidationMessage
} from "react-native-elements";
import { connect } from "react-redux";
import assignItem from "../store/items";
import ModalDropdown from "react-native-modal-dropdown";

// const dummyData = [
//   {
//     item: "burger",
//     price: "$1.50"
//   },
//   {
//     item: "ramen",
//     price: "$13.00"
//   },
//   {
//     item: "Mountain Dew",
//     price: "$1.50"
//   },
//   {
//     item: "falafel",
//     price: "$6.00"
//   }
// ];
>>>>>>> master

class ReceiptForm extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
<<<<<<< HEAD
    this.setState({ data: this.props.navigation.state.params.data })
    // this.setState({data: dummyData})
  }

  render() {
    const data = this.state.data
=======
      this.setState({ data: this.props.navigation.state.params.data })
  }

  render() {
    const data = this.state.data;
>>>>>>> master
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
<<<<<<< HEAD
                  textStyle={{ textAlign: 'center' }}
                  dropdownStyle={{ width: 70 }}
                  options={['option 1', 'option 2']}
                />
              </View>
            )
=======
                  textStyle={{ textAlign: "center" }}
                  dropdownStyle={{ width: 70 }}
                  options={["option 1", "option 2"]}
                />
              </View>
            );
>>>>>>> master
          })}
          <View>
            <Button style={styles.sendAllBtn} title="Send All" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  merchantText: {
    justifyContent: 'flex-start',
  },
  lineItem: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
=======
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  merchantText: {
    justifyContent: "flex-start"
  },
  lineItem: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center"
>>>>>>> master
  },
  input: {
    borderColor: "black",
    borderRadius: 2,
    width: 100,
    height: 30,
  },
  addItemBtn: {
    width: 50,
<<<<<<< HEAD
    justifyContent: 'flex-end',
=======
    justifyContent: "flex-end"
>>>>>>> master
  },
  sendAllBtn: {
    width: 100,
  },
  friendBtn: {
    backgroundColor: "#b3e6ff",
    borderRadius: 2,
    borderWidth: 1,
    width: 70,
<<<<<<< HEAD
    borderColor: 'black',
  },
})

const mapStateToProps = state => {
  console.log('STATE', state)
  return {

=======
    borderColor: "black"
>>>>>>> master
  }
}

const mapDispatchToProps = dispatch => ({
<<<<<<< HEAD
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient)),
  getUserFriends: (userId) => dispatch(getUserFriends(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiptForm)
=======
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient))
});

export default connect(
  null,
  mapDispatchToProps
)(ReceiptForm);
>>>>>>> master
