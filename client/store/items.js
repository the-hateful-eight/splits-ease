const SET_ITEMS = 'SET_ITEMS'
const ASSOCIATE_ITEM = 'ASSOCIATE_ITEM'
const UNASSOCIATE_ITEM = 'UNASSOCIATE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'

//action creators
const setReceiptItems = items => ({
  type: SET_ITEMS,
  items,
})

const associateItem = (index, recipient) => ({
  type: ASSOCIATE_ITEM,
  index,
  recipient,
})

const unassociateItem = index => ({
  type: UNASSOCIATE_ITEM,
  index,
})

const addedItem = item => ({
  type: ADD_ITEM,
  item
})

const removedItem = item => ({
  type: REMOVE_ITEM,
  item
})

//thunk
export const setItems = items => {
  return dispatch => {
    dispatch(setReceiptItems(items))
  }
}

export const assignItem = (index, recipient) => {
  return dispatch => {
    dispatch(associateItem(index, recipient))
  }
}

export const unassignItem = index => {
  return dispatch => {
    dispatch(unassociateItem(index))
  }
}

export const addItem = item => {
  return dispatch => {
    dispatch(addedItem(item))
  }
}

export const removeItem = item => {
  return dispatch => {
    dispatch(removeItem(item))
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ASSOCIATE_ITEM:
      state[action.index].belongsTo = action.recipient
      return state
    case UNASSOCIATE_ITEM:
      delete state.items[action.index].belongsTo
      return state
    case ADD_ITEM:
      return [...state, action.item]
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.item.id)
    default:
      return state
  }
}
