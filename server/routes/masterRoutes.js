const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

// Manage User
router.get('/manage-user', masterController.getUsers);
router.put('/update-user/:id', masterController.updateUser);
router.post('/reset-password/:id', masterController.resetPassword);
// Manage Question
router.get('/manage-question', masterController.getQuestions);
router.post('/manage-question', masterController.createQuestion);
router.put('/manage-question', masterController.updateQuestion);
router.delete('/manage-question/:pilihan_teks', masterController.deleteQuestion);

module.exports = router;