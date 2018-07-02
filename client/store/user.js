import axios from 'axios'
import Expo from 'expo'
const { manifest } = Expo.Constants
const ip = manifest.packagerOpts.dev
  ? manifest.debuggerHost
      .split(`:`)
      .shift()
      .concat(`:1337`)
  : `localhost:1337`

//Initial State
const initialState = {
  user: {},
  userFriends: [],
  userFriend: {},
}

//Actions
const GOT_USER = 'GOT_USER'
const GOT_USER_FRIENDS = 'GOT_USER_FRIENDS'
const GOT_USER_FRIEND = 'GOT_USER_FRIEND'
const CREATED_USER = 'CREATED_USER'
const ADD_FRIEND = 'ADD_FRIEND'
const EDIT_FRIEND = 'EDIT_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'

//Action creators
const gotMe = user => ({
  type: GOT_USER,
  user
})

const gotUserFriends = userFriends => ({
  type: GOT_USER_FRIENDS,
  userFriends
})

const createdUser = user => ({
  type: CREATED_USER,
  user
})

const addedFriend = friend => ({
  type: ADD_FRIEND,
  friend
})

const editedFriend = (friendId, friendData) => ({
  type: EDIT_FRIEND,
  friendId,
  friendData
})

const deletedFriend = (id, friendId) => ({
  type: DELETE_FRIEND,
  friendId,
  id
})

//Thunks
// export const getMe = () => dispatch =>
//   axios
//     .get('/api/me')
//     .then(res => res.data)
//     .then(user => dispatch(gotMe(user)))
//     .catch(err => console.log(err))

export const login = userInfo => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`http://${ip}/api/user/login`, userInfo)
      return dispatch(gotMe(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// export const logout = () => dispatch => {
//   return axios
//     .delete('/auth/logout')
//     .then(() => dispatch(gotMe(initialState.user)))
//     .catch(err => console.log(err))
// }

export const getUserFriends = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://${ip}/api/user/${id}/friends`)
      return dispatch(gotUserFriends(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const createUser = user => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`http://${ip}/api/user`, user)
      return dispatch(gotMe(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addFriend = (friend, id) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`http://${ip}/api/user/${id}/friends`, friend)
      return dispatch(addedFriend(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteFriend = (id, friendId) => {
  return async dispatch => {
    try {
      await axios.delete(`http://${ip}/api/user/${id}/friends/${friendId}`)
      dispatch(deletedFriend(id, friendId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const editFriend = (id, friendData) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`http://${ip}/api/user/${id}/friends`, friendData)
      return dispatch(editedFriend(friendData.id, data))
    } catch (err) {
      console.log(err)
    }
  }
}

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return {
        ...state,
        user: action.user,
      }
    case GOT_USER_FRIENDS:
      return {
        ...state,
        userFriends: action.userFriends,
      }
    case GOT_USER_FRIEND:
      return {
        ...state,
        userFriend: action.userFriend,
      }
    case CREATED_USER:
      return {
        ...state,
        user: action.user
      }
    case ADD_FRIEND:
      return {
        ...state,
        userFriends: [...state.userFriends, action.friend]
      }
    case DELETE_FRIEND:
      return {
        ...state,
        userFriends: [...state.userFriends.filter(friend => {
          if (friend.id !== action.friendId){
            return friend
          }
        })]
      }
    case EDIT_FRIEND:
      return {
        ...state,
        userFriends: [...state.userFriends.filter(friend => {
          if (friend.id !== action.friendId){
            return friend
          }
        }), action.friendData[0]]
      }
    default:
      return state
  }
}
