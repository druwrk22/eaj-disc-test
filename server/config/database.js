const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('eaj_disc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;