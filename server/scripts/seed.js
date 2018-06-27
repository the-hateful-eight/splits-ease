const db = require('../server/db/db')
const {
  Friend,
  Item,
  Receipt,
  User
} = require('../server/db/models')

const users = [
  {
    email: 'cody@email.com',
    password: '123'
  },
  {
    email: 'jason@email.com',
    password: '456'
  },
]

const friends = [
  {
    name: 'Bob',
    email: 'bob@email.com',
    phone: null
  },
  {
    name: 'Jim',
    email: null,
    phone: '555-555-1234'
  },
  {
    name: 'Sarah',
    email: 'sarah@email.com',
    phone: '555-555-6789'
  },
]

const receipts = [
  {
    vendor: 'CVS',
    vendorAddress: '123 Main St.'
  },
  {
    vendor: 'Wendys',
    vendorAddress: '555 Food Ave.'
  }
]

const items = [
  {
    name: 'Doritos',
    price: 4.97,
    quantity: 2
  },
  {
    name: 'No. 2 pencils',
    price: 7.89,
    quantity: 1
  },
  {
    name: 'Asprin',
    price: 8.19,
    quantity: 1
  },
  {
    name: 'Baconator',
    price: 7.89,
    quantity: 1
  },
  {
    name: '12 oz. drink',
    price: 2.78,
    quantity: 1
  },
  {
    name: 'fries',
    price: 3.19,
    quantity: 1
  }
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const createdUsers = await User.bulkCreate(users, { returning: true })
  const createdFriends = await Friend.bulkCreate(friends, {returning: true})
  const createdReceipts = await Receipt.bulkCreate(receipts, {returning: true})
  const createdItems = await Friend.bulkCreate(items, {returning: true})

  await Promise.all([
    createdFriends[0].setUser(createdUsers[0]),
    createdFriends[1].setUser(createdUsers[1]),
    createdFriends[2].setUser(createdUsers[0]),
  ])

  await Promise.all([
    createdReceipts[0].setUser(createdUsers[0]),
    createdReceipts[1].setUser(createdUsers[1])
  ])

  await Promise.all([
    createdItems[0].setReceipt(createdReceipts[0]),
    createdItems[1].setReceipt(createdReceipts[0]),
    createdItems[2].setReceipt(createdReceipts[0]),
    createdItems[3].setReceipt(createdReceipts[1]),
    createdItems[4].setReceipt(createdReceipts[1]),
    createdItems[5].setReceipt(createdReceipts[1]),
  ])

  await Promise.all([
    createdUsers,
    createdFriends,
    createdReceipts,
    createdItems
  ])
}

if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .finally(() => {
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  console.log('seeding...')
}

module.exports = seed
