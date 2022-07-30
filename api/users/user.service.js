const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registeration(firstName, lastName, gender, email, password, number)
            values(?,?,?,?,?,?)`, 
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUsers: callback => {
        pool.query(
            `select id,firstName,lastName,gender,email,number from registeration`,
            [],  // this is blank because wa have no value to pass.
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUserByUserId: (id, callback) => {
        pool.query(
            `select id,firstName,lastName,gender,email,number from registeration where id=? `,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    updateUsers: (data, callback) => {
        pool.query(
            `update registeration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    deleteUsers: (data, callback) => {
        pool.query(
            `delete from registeration where id=?`,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(
            `select * from registeration where email=?`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                //console.log(results);
                return callback(null, results[0]);
            }
        );
    }
 
}