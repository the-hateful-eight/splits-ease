import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Slider } from 'react-native-elements'

class Settings extends Component {
    constructor() {
        super()
        this.state = {
            value: 0,
        }
    }
    componentDidMount() {
        this.props.navigation.navigate('DrawerClose')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => this.setState({ value })} />
                <Text>Value: {this.state.value}</Text>
            </View>
        )
    }
}


//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     header: {
//       height: 200
//     }
//   })

//   const mapStateToProps = state => {
//     return {
//       user: state.user.user,
//       userFriends: state.user.userFriends
//     }
//   }

//   const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//       logoutPress: () => {
//         dispatch(logout())
//           .then(() => {
//             ownProps.navigation.navigate('Home')
//           })
//       },
//       getUserFriends: (id) => {
//         dispatch(getUserFriends(id))
//       }
//     }
//   }

export default connect(
    null,
    null
)(Settings)