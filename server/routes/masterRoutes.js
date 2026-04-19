const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

router.get('/manage-user', masterController.getUsers);
router.put('/update-user/:id', masterController.updateUser);
router.post('/reset-password/:id', masterController.resetPassword);

module.exports = router;