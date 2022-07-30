const {
    createUser, 
    getUsers, 
    getUserByUserId, 
    updateUsers, 
    deleteUsers,
    login
} = require('./user.controller');

const router = require('express').Router()
const {checkToken} = require('../../auth/token_validation');

router.post('/', checkToken, createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserByUserId);
router.patch('/', checkToken, updateUsers);  // patch method equals to update
router.delete('/', checkToken, deleteUsers);
router.post('/login', login);

module.exports = router; 