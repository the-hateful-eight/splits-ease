import axios from 'axios'

//actions 
export const GOT_USERS = 'GOT_USERS'
export const GOT_USER = 'GOT_USER'
export const GOT_USER_FRIENDS = 'GOT_USER_FRIENDS'
export const GOT_USER_FRIEND = 'GOT_USER_FRIEND'

//action creators
export const gotUserFriends = userFriends => ({
  type: GOT_USER_FRIENDS,
  userFriends
})

//thunks
export const getUserFriends = (userId) =>
  dispatch =>
    axios.get(`api/user/${userId}/friends`)
      .then(res =>
        dispatch(gotUserFriends(res.data)))
      .catch(err => console.log(err))

const initialState = {
  users: [],
  user: {},
  userFriends: [],
  userFriend: {},
}

const userReducer = (state = initialState, action) => {
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
      }
    case GOT_USER_FRIENDS:
      return {
        ...state,
        userFriends: action.userFriends
      }
    case GOT_USER_FRIEND: 
      return {
        ...state,
        userFriend: action.userFriend
      }
    default: 
      return state;
  }
}

export default userReducer