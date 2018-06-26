const db = require('./db')
const User = require('./models/User')
const Receipt = require('./models/Receipt')
const Item = require('./models/Item')
const Friend = require('./models/Friend')

//associations
Friend.belongsTo(User)
User.hasMany(Friend)

Receipt.belongsTo(User)
User.hasMany(Receipt)

Item.belongsTo(Receipt)
Receipt.hasMany(Item)

module.exports = {
  db,
  User,
  Receipt,
  Item
}
