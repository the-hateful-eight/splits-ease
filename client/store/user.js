import axios from 'axios'

<<<<<<< HEAD
//Actions
=======
//Actions 
>>>>>>> master
const GOT_USERS = 'GOT_USERS'
const GOT_USER = 'GOT_USER'
const GOT_USER_FRIENDS = 'GOT_USER_FRIENDS'
const GOT_USER_FRIEND = 'GOT_USER_FRIEND'

//Action creators
export const gotUserFriends = userFriends => ({
  type: GOT_USER_FRIENDS,
<<<<<<< HEAD
  userFriends,
})

//Thunks
export const getUserFriends = userId => dispatch =>
  axios
    .get(`api/user/${userId}/friends`)
    .then(res => dispatch(gotUserFriends(res.data)))
    .catch(err => console.log(err))
=======
  userFriends
})

//Thunks
export const getUserFriends = (userId) =>
  dispatch =>
    axios.get(`api/user/${userId}/friends`)
      .then(res =>
        dispatch(gotUserFriends(res.data)))
      .catch(err => console.log(err))
>>>>>>> master

//Initial State
const initialState = {
  users: [],
  user: {},
  userFriends: [],
  userFriend: {},
}

//Reducer
export default function(state = initialState, action) {
<<<<<<< HEAD
  switch (action.type) {
    case GOT_USERS:
      return {
        ...state,
        users: action.users,
      }
    case GOT_USER:
      return {
        ...state,
        user: action.user,
=======
  switch(action.type) {
    case GOT_USERS:
      return {
        ...state,
        users: action.users
      }
    case GOT_USER: 
      return {
        ...state,
        user: action.user
>>>>>>> master
      }
    case GOT_USER_FRIENDS:
      return {
        ...state,
<<<<<<< HEAD
        userFriends: action.userFriends,
      }
    case GOT_USER_FRIEND:
      return {
        ...state,
        userFriend: action.userFriend,
      }
    default:
      return state
=======
        userFriends: action.userFriends
      }
    case GOT_USER_FRIEND: 
      return {
        ...state,
        userFriend: action.userFriend
      }
    default: 
      return state;
>>>>>>> master
  }
}
