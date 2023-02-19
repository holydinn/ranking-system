const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('admin', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING}
})

const Event = sequelize.define('event', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  alt_num: {type: DataTypes.INTEGER, allowNull: false},
  exp_num: {type: DataTypes.INTEGER, allowNull: false}
})

const Alternative = sequelize.define('alternative', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Expert = sequelize.define('expert', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  ranking: {type: DataTypes.STRING},
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
