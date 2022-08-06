const db = require('../../models');
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

const getUsers = async (req, res) => {
    await db.register.findAll()
    .then(results => res.json({
        success: 1,
        data: results
    }))
    .catch(error => console.log(error)) 
}


const getUserByUserId = async (req, res) => {
    const id = req.params.id;
    await db.register.findAll({where:{id}})
    .then(results => {
        if(!results[0]) { //When the results = [] so results[0] does not exist
            return res.json({
                success: 0,
                message: 'Record Not Found'
            })
        }
        return res.json({
            success: 1,
            data: results
        })
    })
    .catch(error => console.log(error))
}


const updateUsers = async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);

    if(!body.id || body.id == null) {
        return res.status(400).json({
            success: 0,
            message: 'ID is required'
        })
    }
    if(!body.password || body.password == null) {
        return res.status(400).json({
            success: 0,
            message: 'Password is required'
        })
    }
    body.password = hashSync(body.password, salt);
    await db.register.update(
        {
            firstName: body.first,
            lastName: body.lastName,
            gender: body.gender,
            email: body.email,
            password: body.password,
            number: body.number
        },
        {
            where: {id: body.id}
        },
    )
    .then(() => {
        return res.status(200).json({
            success: 1,
            message: 'Updated successfully'
        });
    })
    .catch(error => {
        console.log('ERROR : ', error);
        return res.status(500).json({
        success: 0,
        message: 'Unable to update for some reasons'
        });
    })
}


const createUser = async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    await db.register.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        password: body.password,
        number: body.number
    }).then(results => {
        return res.status(200).json({
        success: 1,
        data: results
    })})
    .catch(error => {
        console.log(error);
        return res.status(500).json({
            success: 0,
            message: 'Database connection error'
        })
    })
}


const deleteUsers = async (req, res) => {
    const id = req.body.id;
    if(!id || id == null) {
        return res.status(400).json({
            success: 0,
            message: 'ID is required'
        });
    }
    await db.register.findOne({where: {id}})
    .then((result) => {
        db.register.destroy({where:{id: result.dataValues.id}})
    })
    .then((result) => {
        return res.status(200).json({
            success: 1,
            message: 'User deleted successfully'
        });
    })
    .catch(() => {
        return res.status(404).json({
            success: 0,
            message: 'No Record Found'
        });
    })
}


const login = async (req, res) => {
    const body = req.body;
    await db.register.findOne({
        where: {email: body.email}
    })
    .then((results) => {
        const result = compareSync(body.password, results.password);
        if(result) {
            results.password = undefined;
            const secretKey = process.env.SC_KEY;
            console.log('SecretKey: ', secretKey);
            const jsontoken = sign({result: results}, secretKey, {
                expiresIn: '1h'
            });
            return res.json({
                success: 1,
                message: 'Logged in successfuly',
                token: jsontoken
            });
        }
        return res.status(400).json({
            success: 0,
            message: 'Invalid Password'
        });
    })
    .catch(() => {
        return res.status(400).json({
            success: 0,
            message: 'Invalid email'
        });
    })
}


module.exports = {
    getUsers,
    getUserByUserId,
    updateUsers,
    createUser,
    deleteUsers,
    login
}