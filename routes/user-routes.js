const express = require('express');
const {addUser, getAllUsers, getUser, updateUser, deleteUser, verifyPass} = require('../controllers/userController');
const router = express.Router();

router.post('/user', addUser);
router.get('/users',getAllUsers);
router.get('/user/:id',getUser);
router.post('/verify',verifyPass);
router.put('/user/:id',updateUser);
router.delete('/user/:id',deleteUser);

module.exports = router;
