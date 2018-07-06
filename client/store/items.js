const SET_ITEMS = 'SET_ITEMS'
const ASSOCIATE_ITEM = 'ASSOCIATE_ITEM'
const UNASSOCIATE_ITEM = 'UNASSOCIATE_ITEM'

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

export default function(state = [], action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ASSOCIATE_ITEM:
      state[action.index].belongsTo = action.recipient
      return state
    case UNASSOCIATE_ITEM:
      delete state[action.index].belongsTo
      return state
    default:
      return state
  }
}
