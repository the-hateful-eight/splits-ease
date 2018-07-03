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
  userReceipts: []
}

//Actions
export const GOT_USER = 'GOT_USER'
export const GOT_USER_FRIENDS = 'GOT_USER_FRIENDS'
export const GOT_USER_FRIEND = 'GOT_USER_FRIEND'
export const ADD_FRIEND = 'ADD_FRIEND'
export const EDIT_FRIEND = 'EDIT_FRIEND'
export const DELETE_FRIEND = 'DELETE_FRIEND'
export const GOT_USER_RECEIPTS = 'GOT_USER_RECEIPTS'

//Action creators
export const gotMe = user => ({
  type: GOT_USER,
  user
})

export const gotUserFriends = userFriends => ({
  type: GOT_USER_FRIENDS,
  userFriends
})

export const addedFriend = friend => ({
  type: ADD_FRIEND,
  friend
})

export const editedFriend = (friendId, friendData) => ({
  type: EDIT_FRIEND,
  friendId,
  friendData
})

export const deletedFriend = (id, friendId) => ({
  type: DELETE_FRIEND,
  friendId,
  id
})

const gotUserReceipts = userReceipts => ({
  type: GOT_USER_RECEIPTS,
  userReceipts
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

export const getUserReceipts = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://${ip}/api/receipts/${id}`)
      return dispatch(gotUserReceipts(data))
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
    case GOT_USER_RECEIPTS:
      return{
        ...state,
        userReceipts: action.userReceipts
      }
    default:
      return state
  }
}
