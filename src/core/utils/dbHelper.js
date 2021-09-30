const Sequelize = require("sequelize");
const config = require( './../../../config' );

const db = {};

let host = config.host;
let username = config.username;
let password = config.password;
let database = config.db_name;
let dialect = "mysql";
let pool = {
    max: 5, 
    min: 0, 
    acquire: 30000, 
    idle: 10000
};

db.Sequelize = Sequelize;

// connect to db
const sequelize = new Sequelize(
    database, 
    username, 
    password, 
    {
        host: host,
        dialect: dialect,
        logging: false,
        port: 3306,
        pool: pool
    }
);

db.sequelize = sequelize;

sequelize
    .authenticate()
    .then(() => {
  
        console.log("Connection has been established successfully.");
  
    })
    .catch((err) => {
  
        console.error("Unable to connect to the database:", err);
  
    });

db.Products = require("../../models/products")(sequelize, Sequelize);
db.Category = require("../../models/category")(sequelize, Sequelize);
db.Bucket = require("./../../models/bucket")(sequelize, Sequelize);
db.Checklist = require("./../../models/checklist")(sequelize, Sequelize);

sequelize.sync();

module.exports = db;