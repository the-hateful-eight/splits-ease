import {expect} from 'chai'
import reducer, {setItems, assignItem, unassignItem} from './items'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('itemReducer', () => {
    it('starts with an initial state of an empty array', () => {
        const newState = reducer(undefined, '@@INIT')
        expect(newState).to.deep.equal([])
    })

    it('sets the state to be items on the state when a SET_ITEMS is dispatched', () => {
        const item = { name: 'Mountain Dew', price: 1.99, quantity: 1}
            const newState = reducer([], setItems(item))
            expect(newState).to.deep.equal(item)
    })

    it('sets item to user when an ASSOCIATE_ITEM is dispatched', () => {
        const item = { id: 1, name: 'Mountain Dew', price: 1.99, quantity: 1 }
        const friend = { id: 1, name: 'This is Patrick', email: 'thisIsPatrick@email.com', phone: '1234567890'}
        const newState = reducer([], assignItem(0, friend))
        expect(newState).to.deep.equal()
    })

    it('removes item from user when an UNASSOCIATE_ITEM is dispatched', () => {
        const item = { id: 1, name: 'Mountain Dew', price: 1.99, quantity: 1 }
        const newState = reducer([], unassignItem(0))
        expect(newState).to.deep.equal([])
    })
})