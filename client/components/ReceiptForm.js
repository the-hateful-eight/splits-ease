import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import assignItem from '../store/items'

class ReceiptForm extends React.Component {
  state = {
    data: []
  };

  componentDidMount () {
    this.setState({data: this.props.navigation.state.params.data})
  }

  render () {
    const data = this.state.data
    return (
      <View style={styles.container}>
      <ScrollView>
      {data.map(item => {
        return (
          <View key={item.id} style={styles.lineItem}>
          <Text style={styles.merchantText} id={item.id}>{item.item} : {item.price}</Text>
          <Button style={styles.addItemBtn} title='+' />
          </View>
        )
      })}
        <View>
          <Button style={styles.sendAllBtn} title='Send All'/>
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
    flexDirection: 'row'
  },
  addItemBtn: {
    width: 50,
    justifyContent: 'flex-end'
  },
  sendAllBtn: {
    width: 100
  }
});

const mapDispatchToProps = dispatch => ({
  assignItem: (id, receipient) => dispatch(assignItem(id, receipient))
})

export default connect(null, mapDispatchToProps)(ReceiptForm)
