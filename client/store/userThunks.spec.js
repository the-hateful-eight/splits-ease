import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
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
import fetchMock from 'fetch-mock'
import expect from 'expect'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates GOT_USER_FRIENDS when fetching user friends has been done', () => {
        fetchMock
            .getOnce('/friends', { body: 
                friends = [
                    {name: 'friend1', phone: '1323423421', email: 'friend1@email.com'},
                    {name: 'friend2', phone: '1435252434', email: 'friend2@email.com'}
                ] 
            })

        const expectedActions = [
            { type: GOT_USER_FRIENDS },
            { type: GOT_USER_FRIENDS, 
              body: { friends: [{name: 'friend1', phone: '1323423421', email: 'friend1@email.com'},
                                {name: 'friend2', phone: '1435252434', email: 'friend2@email.com'}]
                    }   
            }
        ]

        const store = mockStore({
            friends: [{name: 'friend1', phone: '1323423421', email: 'friend1@email.com'},
                      {name: 'friend2', phone: '1435252434', email: 'friend2@email.com'}]
        })

        return store.dispatch(getUserFriends()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
