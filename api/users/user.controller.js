// FIX A BUG: a user's token is valid even if the user is been deleted!
// The token should be expired after user deletion

const service = require('./user.service');

// # Bug: throw exception in Duplicate Entry situation due to unique fields

const createUser = service.createUser;
const getUsers = service.getUsers;
const getUserByUserId = service.getUserByUserId;
const updateUsers = service.updateUsers;
const deleteUsers = service.deleteUsers;

// # Bug: retruns 'invalid email' when no password recieved
const login = service.login;


module.exports = {
    getUsers,
    getUserByUserId,
    createUser,
    updateUsers,
    deleteUsers,
    login
}