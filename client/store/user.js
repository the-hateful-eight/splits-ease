import axios from 'axios'

const GET_USER_FRIENDS = 'GET_USER_FRIENDS'

const gotUserFriends = user => ({
  type: GET_USER_FRIENDS,
  user
})

export const friends = (userId) =>
  dispatch =>
    axios.get(`/${userId}/friends`)
      .then(res =>
        dispatch(gotUserFriends(res.data)))
      .catch(err => console.log(err))
