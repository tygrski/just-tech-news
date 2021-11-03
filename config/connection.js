// import the Sequalize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database, pass in your MYSQL information for username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER , process.env.DB_PW, {
  host: 'localhost',
  name: "root",
  password: 'RockyRanch88',
  dialect: 'mysql',
  // loggin: false get ride of the text above  Now listening in the tetminal after starting server
  logging: false,
  port: 3306
});
// location of stylesheet http://localhost:3001/assests/stylesheets/styles.css

module.exports = sequelize;