
const {
  db,
  Friend,
  Item,
  Receipt,
  User
} = require('../db')

const users = [
  {
    name: 'Reese',
    email: 'reese@gmail.com',
    phone: '123-456-7890',
    password: '123',
    avatar: 'assets/reese_avatar'
  },
  {
    name: 'Sean',
    email: 'sean@gmail.com',
    phone: '234-567-8910',
    password: '456',
    avatar: 'assets/sean_avatar'
  },
  {
    name: 'Patrick',
    email: 'patrick@gmail.com',
    phone: '555-123-4567',
    password: '789',
    avatar: 'assets/patrick_avatar'
  },
  {
    name: 'Kevin',
    email: 'kevin@gmail.com',
    phone: '444-567-8910',
    password: '999',
    avatar: 'assets/kevin_avatar'
  },
  {
    name: 'Matt',
    email: 'matt@gmail.com',
    phone: '555-555-0987',
    password: '000',
    avatar: 'assets/matt_avatar'
  }
]

const friends = [
  {
    name: 'Reese',
    email: 'reese@gmail.com',
    phone: '123-456-7890',
    password: '123',
    avatar: 'assets/reese_avatar'
  },
  {
    name: 'Sean',
    email: 'sean@gmail.com',
    phone: '234-567-8910',
    password: '456',
    avatar: 'assets/sean_avatar'
  },
  {
    name: 'Patrick',
    email: 'patrick@gmail.com',
    phone: '555-123-4567',
    password: '789',
    avatar: 'assets/patrick_avatar'
  },
  {
    name: 'Kevin',
    email: 'kevin@gmail.com',
    phone: '444-567-8910',
    password: '999',
    avatar: 'assets/kevin_avatar'
  },
  {
    name: 'Matt',
    email: 'matt@gmail.com',
    phone: '555-555-0987',
    password: '000',
    avatar: 'assets/matt_avatar'
  }
]

const receipts = [
  {
    vendor: 'CVS',
    vendorAddress: '123 Main St.',
    // userId: 0,
  },
  {
    vendor: 'Wendys',
    vendorAddress: '555 Food Ave.',
    // userId: 0,
  },
  {
    vendor: 'Barry\'s Bodega',
    vendorAddress: '1010 Neghborhood Ave.',
    // userId: 1,
  },
  {
    vendor: 'J-Crew',
    vendorAddress: '450 Park Pl.',
    // userId: 1,
  }

]

const items = [
  {
    name: 'Doritos',
    price: 4.97,
    quantity: 2,
    // receiptId: 0,
  },
  {
    name: 'No. 2 pencils',
    price: 7.89,
    quantity: 1,
    // receiptId: 0,
  },
  {
    name: 'Asprin',
    price: 8.19,
    quantity: 1,
    // receiptId: 0,
  },
  {
    name: 'Baconator',
    price: 7.89,
    quantity: 1,
    // receiptId: 1,
  },
  {
    name: '12 oz. drink',
    price: 2.78,
    quantity: 1,
    // receiptId: 1,
  },
  {
    name: 'fries',
    price: 3.19,
    quantity: 1,
    // receiptId: 1,
  },
  {
    name: 'cigarettes',
    price: 14.10,
    quantity: 1,
    // receiptId: 2,
  },
  {
    name: 'deoderant',
    price: 5.29,
    quantity: 1,
    // receiptId: 2,
  },
  {
    name: 'peanut butter crackers',
    price: 1.59,
    quantity: 3,
    // receiptId: 2,
  },
  {
    name: 'jeans',
    price: 58.94,
    quantity: 1,
    // receiptId: 3,
  },
  {
    name: 'button-down blue',
    price: 48.57,
    quantity: 1,
    // receiptId: 3,
  },
  {
    name: 'fancy socks',
    price: 6.74,
    quantity: 3,
    // receiptId: 3,
  },
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const createdUsers = await User.bulkCreate(users, { returning: true })
  const reeseFriends = await Friend.bulkCreate(friends, { returning: true })
  const seanFriends = await Friend.bulkCreate(friends, { returning: true })
  const createdReceipts = await Receipt.bulkCreate(receipts, { returning: true })
  const createdItems = await Item.bulkCreate(items, {returning: true})

  await Promise.all([
    reeseFriends[0].setUser(createdUsers[0]),
    reeseFriends[1].setUser(createdUsers[0]),
    reeseFriends[2].setUser(createdUsers[0]),
    reeseFriends[3].setUser(createdUsers[0]),
    reeseFriends[4].setUser(createdUsers[0]),
    seanFriends[0].setUser(createdUsers[1]),
    seanFriends[1].setUser(createdUsers[1]),
    seanFriends[2].setUser(createdUsers[1]),
    seanFriends[3].setUser(createdUsers[1]),
    seanFriends[4].setUser(createdUsers[1]),
  ])

  await Promise.all([
    createdReceipts[0].setUser(createdUsers[0]),
    createdReceipts[1].setUser(createdUsers[0]),
    createdReceipts[2].setUser(createdUsers[1]),
    createdReceipts[3].setUser(createdUsers[1]),
  ])

  await Promise.all([
    createdItems[0].setReceipt(createdReceipts[0]),
    createdItems[1].setReceipt(createdReceipts[0]),
    createdItems[2].setReceipt(createdReceipts[0]),
    createdItems[3].setReceipt(createdReceipts[1]),
    createdItems[4].setReceipt(createdReceipts[1]),
    createdItems[5].setReceipt(createdReceipts[1]),
    createdItems[6].setReceipt(createdReceipts[2]),
    createdItems[7].setReceipt(createdReceipts[2]),
    createdItems[8].setReceipt(createdReceipts[2]),
    createdItems[9].setReceipt(createdReceipts[3]),
    createdItems[10].setReceipt(createdReceipts[3]),
    createdItems[11].setReceipt(createdReceipts[3]),
  ])

  await Promise.all([
    createdUsers,
    reeseFriends,
    seanFriends,
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
    .then(() => {
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  console.log('seeding...')
}

module.exports = seed
