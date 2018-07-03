import {expect} from 'chai'
import reducer, {getUserFriends, addFriend, login} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('userReducer', () => {
    it('starts with an initial state of an empty user', () => {
        const newState = reducer(undefined, '@@INIT')
        expect(newState).to.deep.equal({})
    })

    it('sets the state to be a user on the state when a GET_USER action is dispatched', () => {
        const user = { name: 'Cody', email: 'cody@email.com', password: '123' }
        const newState = reducer({}, login(user))
        expect(newState).to.deep.equal(user)
    })

    it('removes user on the state when a removeUser action is dispatched', () => {
        const user = { name: 'Cody', email: 'cody@email.com', password: '123' }
        const newState = reducer(user, logOut(user))
        expect(newState).to.deep.equal({})
    })
})

describe('thunk creators', () => {
    let store, mockAxios

    const initialState = {
        user: {}
    }

    beforeEach(() => {
        mockAxios = new MockAdapter(axios)
        store = mockStore(initialState)
    })

    afterEach(() => {
        mockAxios.restore()
        store.clearActions()
    })

    describe('me', () => {
        it('eventually dispatches the GOT_USER action', () => {
            const fakeUser = { email: 'cody@email.com' }
            mockAxios.onGet('/login').replyOnce(200, fakeUser)
            return store.dispatch(login())
                .then(() => {
                    const actions = store.getActions()
                    expect(actions[0].type).to.be.equal('GOT_USER')
                    expect(actions[0].user).to.be.deep.equal(fakeUser)
                })
        })
    })

    describe('logout', () => {
        it('logout: eventually dispatches the REMOVE_USER action', () => {
            mockAxios.onPost('/logout').replyOnce(204)
            return store.dispatch(logout())
            expect(actions[0].type).to.be.equal('REMOVE_USER')
            expect(history.location.pathname).to.be.equal('/login')
        })
    })

    describe('Get user friends', () => {
        it('eventually dispatches GOT_USER_FRIENDS action', () => {
            const userFriends = [{
                name: 'Bob',
                phone: '12345678909',
                email: 'Bob@email.com'
            }]
            mockAxios.onGet('/:id/friends').replyOnce(200, fakeUser)
            return store.dispatch(getUserFriends(id))
            expect(actions[0].type).to.be.equal('GOT_USER_FRIENDS')
            expect(action[0].userFriends).to.be.deep.equal(userFriends)
        })
    })
})