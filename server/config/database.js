const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('eaj_disc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;