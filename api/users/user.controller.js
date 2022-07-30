const {
    create, 
    getUsers, 
    getUserByUserId, 
    updateUsers, 
    deleteUsers,
    getUserByUserEmail
} = require('./user.service');

const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error'
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if(err) {
                return console.log(err);
            }
            if(!results) {  //It means if result is Null
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                return console.log(err);
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }, 

    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUsers(body, (err, results) => {
            console.log(body);
            if(err) {
                return console.log(err);
            }
            if(!body.id) {
                return res.json({
                    success: 0,
                    message: 'ID is required'
                });
            }
            if(!results) {
                console.log(results);
                return res.json({
                    success: 0,
                    message: 'Unable to update for some reasons'
                })
            }
            return res.json({
                success: 1,
                message: 'Updated successfully'
            });
        });
    },

    deleteUsers: (req, res) => {
        const data = req.body;
        deleteUsers(data, (err, results) => {
            console.log(res.body);
            if(err) {
                return console.log(err);
            }
            /*if(!data.id) {
                return res.json({
                    success: 0,
                    message: 'ID is required'
                });
            }*/
            if(results.affectedRows == 0) {  //It means if result is Null
                console.log(`results does not exist: `, results);
                return res.json({
                    success: 0,
                    message: 'Record not found'
                });
            }
            return res.json({
                success: 1,
                message: 'User deleted successfully'
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if(err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success: 0,
                    data: 'Invalid email or password'
                });
            }
            const result = compareSync(body.password, results.password);
            if(result) {
                results.password = undefined;
                const jsontoken = sign({result: results}, 'qwe1234', {
                    expiresIn: '1h'
                });
                return res.json({
                    success: 1,
                    message: 'Login successfully',
                    token: jsontoken
                }); 
            } else {
                return res.json({
                    success: 0,
                    data: 'Invalid email or password'
                });
            }
        });
    }
}

// FIX A BUG: a user's token is valid even if the user is been deleted!
// The token should be expired after user deletion