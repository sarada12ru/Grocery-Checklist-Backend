require('dotenv').config();

module.exports = {

    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    db_name: process.env.DB_NAME

}