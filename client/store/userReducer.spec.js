import reducer from '../user'
import { 
    GOT_USER, 
    GOT_USER_FRIENDS,
    GOT_USER_FRIEND,
    CREATED_USER,
    ADD_FRIEND,
    EDIT_FRIEND,
    DELETE_FRIEND,
    gotMe,
    gotUserFriends,
    createdUser,
    addedFriend,
    editedFriend,
    deletedFriend,    
    getUserFriends
} from './user'

describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([
            {
                user: {},
                userFriends: [],
                userFriend: {},
                userReceipts: []
            }
        ])
    })

    it('should handle ADD_FRIEND', () => {
        expect(
            reducer([], {
                type: ADD_FRIEND,
                userFriends: [{ name: 'Nousit', email: 'Nousit@email.com', phone: '12443289' }]
            })
        ).toEqual([
            {
                userFriends: [{ name: 'Nousit', email: 'Nousit@email.com', phone: '12443289' }]
            }
        ])
    })
})