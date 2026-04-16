const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const sequelize = require('./config/database');
const discRoutes = require('./routes/discRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', discRoutes);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(err => console.log('Error syncing database: ' + err));