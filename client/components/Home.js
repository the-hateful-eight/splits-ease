import React, { Component } from 'react'
import { ScrollView,StyleSheet, Text, View, Button, Platform, StatusBar, Image } from 'react-native'
import { connect } from 'react-redux'
import { Header, Icon, ListItem, Card } from 'react-native-elements'
import { logout } from '../store'
import { getUserFriends, login } from '../store/user'

class Home extends Component {

  componentDidMount() {
    this.props.navigation.navigate('DrawerClose')
    this.props.getUserFriends(this.props.user.id)
  }

  getTimeOfDay() {
    const time = new Date()
    if (time.getHours() > 0 && time.getHours() < 11) {
      return 'Good Morning'
    }
    else if (time.getHours() >= 11 && time.getHours() < 16) {
      return 'Good Afternoon'
    }
    else {
      return 'Good Evening'
    }
  }

  render() {
    const friends = this.props.userFriends
    return (

      <View>
        <ScrollView>
        <Card
          title={`${this.getTimeOfDay()}, ${this.props.user.name}`}
        >
          <Image
            source={require('../../assets/home.jpg')}
            style={{ width: '100%', resizeMode: 'cover' }}
          />
          <Text style={{ marginBottom: 10, marginTop: 10 }}>
            Welcome to Splits/Ease!
          </Text>
        </Card>
        <Card title='Your Friends'>
          {
            friends.length === 0 ?
              <ListItem 
                rightIcon={{ name: 'add' }}
              />
              :
              friends.map((u, i) => {
                return (
                  <ListItem
                    key={i}
                    roundAvatar
                    title={u.name}
                    rightIcon={{ name: 'message' }}
                  // avatar={{ uri: u.avatar }}
                  />
                );
              })
          }
        </Card>
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
    justifyContent: 'center',
    color: 'white'

  },
  header: {
    height: 200
  },
  cardContainer: {
    flex: 1
  },
})

const mapStateToProps = state => {
  return {
    user: state.user.user,
    userFriends: state.user.userFriends
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutPress: () => {
      dispatch(logout())
        .then(() => {
          ownProps.navigation.navigate('Home')
        })
    },
    getUserFriends: (id) => {
      dispatch(getUserFriends(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
