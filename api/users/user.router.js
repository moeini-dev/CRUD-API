const {checkToken} = require('../../auth/token_validation');

const router = require('express').Router()
const db = require('../../models');
const controller = require('./user.controller');


router.get('/', checkToken, controller.getUsers);
router.get('/:id', checkToken, controller.getUserByUserId);
router.post('/', checkToken, controller.createUser);
router.patch('/', checkToken, controller.updateUsers);
router.delete('/', checkToken, controller.deleteUsers);
router.post('/login', controller.login);

module.exports = router;