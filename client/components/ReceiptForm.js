import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { connect } from 'react-redux'
import assignItem from '../store/items'
import getUserFriends from '../store/user'
import ModalDropdown from 'react-native-modal-dropdown'

class ReceiptForm extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
      this.setState({ data: this.props.navigation.state.params.data })
  }

  render() {
    const data = this.state.data;
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
                  options={['option 1', 'option 2']}
                />
              </View>
            )
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
  },
  input: {
    borderColor: "black",
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
    backgroundColor: "#b3e6ff",
    borderRadius: 2,
    borderWidth: 1,
    width: 70,
    borderColor: "black"
  }
})

const mapDispatchToProps = dispatch => ({
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient))
});

export default connect(
  null,
  mapDispatchToProps
)(ReceiptForm);
