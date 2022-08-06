require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./api/users/user.router');
const db = require('./models')
const PORT = process.env.APP_PORT || 5000


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/users', userRouter);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})

// Without using Sequelize : 
//app.listen(process.env.APP_PORT, () => console.log(`Server running on port ${process.env.APP_PORT} ...`));


