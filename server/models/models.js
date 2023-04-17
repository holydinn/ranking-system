const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('admin', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING}
})

const Event = sequelize.define('event', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Alternative = sequelize.define('alternative', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  name: {type: DataTypes.STRING, allowNull: false}
})

const Expert = sequelize.define('expert', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
  name: {type: DataTypes.STRING, allowNull: false},
  ranking: {type: DataTypes.ARRAY(DataTypes.INTEGER)},
  link: {type: DataTypes.STRING, unique: true}
})

Admin.hasMany(Event)
Event.belongsTo(Admin)

Event.hasMany(Alternative)
Alternative.belongsTo(Event)

Event.hasMany(Expert)
Expert.belongsTo(Event)

module.exports = {
  Admin, Event, Alternative, Expert
}
