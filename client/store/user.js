import axios from 'axios'

//Actions
const GOT_USERS = 'GOT_USERS'
const GOT_USER = 'GOT_USER'
const GOT_USER_FRIENDS = 'GOT_USER_FRIENDS'
const GOT_USER_FRIEND = 'GOT_USER_FRIEND'

//Action creators
export const gotUserFriends = userFriends => ({
  type: GOT_USER_FRIENDS,
  userFriends,
})

//Thunks
export const getUserFriends = userId => dispatch =>
  axios
    .get(`api/user/${userId}/friends`)
    .then(res => dispatch(gotUserFriends(res.data)))
    .catch(err => console.log(err))

//Initial State
const initialState = {
  users: [],
  user: {},
  userFriends: [],
  userFriend: {},
}

//Reducer
export default function(state = initialState, action) {
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
