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

//Action creators
const gotMe = user => ({
  type: GOT_USER,
  user,
})

const gotUserFriends = userFriends => ({
  type: GOT_USER_FRIENDS,
  userFriends,
})

const createdUser = user => ({
  type: CREATED_USER,
  user,
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

export const getUserFriends = userId => {
  return async dispatch => {
    try{
      const { data } = await axios.get(`http://${ip}/api/user/${userId}/friends`)
      // await console.log('DATA for FRIENDS is', data)
      return dispatch(gotUserFriends(data))
    }catch(err){
      console.log(err)
    }
  }
}
  // axios
  //   .get(`api/user/${userId}/friends`)
  //   .then(res => dispatch(gotUserFriends(res.data)))
  //   .catch(err => console.log(err))

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
    default:
      return state
  }
}
