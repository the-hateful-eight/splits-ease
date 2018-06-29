import axios from 'axios'

const SET_ITEMS = "SET_ITEMS";
const ASSOCIATE_ITEM = "ASSOCIATE_ITEM";
const UNASSOCIATE_ITEM = "UNASSOCIATE_ITEM";

const setReceiptItems = items => ({
  type: SET_ITEMS,
  items
});

const associateItem = (index, recipient) => ({
  type: ASSOCIATE_ITEM,
  index,
  recipient
});

const unassociateItem = index => ({
  type: UNASSOCIATE_ITEM,
  index
});

export const setItems = items => {
  return dispatch => {
    dispatch(setReceiptItems(items));
  };
};

export const assignItem = (index, recipient) => {
  return dispatch => {
    dispatch(associateItem(index, recipient));
  };
};

export const unassignItem = index => {
  return dispatch => {
    dispatch(unassociateItem(index));
  };
};

export const sendReceipt = async () => {
  user = {
    name: "Matthew",
    email: "mcontract27@gmail.com",
    phone: "(914) 787-009"
  };
  const receipt = [
    { item: "Eggs", price: "0.99", belongsTo: user },
    { item: "Milk", price: "3.50", belongsTo: user },
    { item: "Chicken", price: "6.99" }
  ];
  await axios.post('/api/receipts/send', receipt)
};

export default function(state = [], action) {
  switch (action.case) {
    case SET_ITEMS:
      return action.items;
    case ASSOCIATE_ITEM:
      state[action.index].belongsTo = action.recipient;
      return state;
    case UNASSOCIATE_ITEM:
      delete state[action.index].belongsTo;
      return state;
    default:
      return state;
  }
}
