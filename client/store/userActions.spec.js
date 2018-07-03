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
    deletedFriend    
} from './user'

describe('actions' , () => {
    it('should create an action to get a user', () => {
        const user = {
            name: 'Reese',
            email: 'Reeses@Pieces.com',
            phone: '12345678'
        }
        const expectedAction = {
            type: GOT_USER,
            user
        }
        expect(gotMe(user)).toEqual(expectedAction)
    })

    it('should create an action to get user friends', () => {
        const userFriends = [
            {
                name: 'Reese',
                email: 'Reeses@Pieces.com',
                phone: '12345678'
            },
            {
                name: 'OtherReese',
                email: 'ReesesPieces@email.com',
                phone: '13453525'
            }
        ]
        const expectedAction = {
            type: GOT_USER_FRIENDS,
            userFriends
        }
        expect(gotUserFriends(userFriends)).toEqual(expectedAction)
    })

    it('should create an action to create a user', () => {
        const user = {
            name: 'Contract',
            email: 'Contract@Killer.com',
            phone: '12345678'
        }
        const expectedAction = {
            type: CREATED_USER,
            user
        }
        expect(createdUser(user)).toEqual(expectedAction)
    })

    it('should create an action to add a friend', () => {
        const friend = {
            name: 'Contract',
            email: 'Contract@Killer.com',
            phone: '12345678'
        }
        const expectedAction = {
            type: ADD_FRIEND,
            friend
        }
        expect(addedFriend(friend)).toEqual(expectedAction)
    })

    it('should create an action to edit a friend', () => {
        const friend = {
            name: 'Contract',
            email: 'Contract@Killer.com',
            phone: '12345678'
        }
        const expectedAction = {
            type: EDIT_FRIEND,
            friend
        }
        expect(editedFriend(friend)).toEqual(expectedAction)
    })

    it('should create an action to delete a friend', () => {
        const friend = {
            name: 'Contract',
            email: 'Contract@Killer.com',
            phone: '12345678'
        }
        const expectedAction = {
            type: DELETE_FRIEND,
            friend
        }
        expect(deletedFriend(friend)).toEqual(expectedAction)
    })
})