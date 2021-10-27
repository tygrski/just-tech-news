const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create user model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }
}

// define table and columns configuration
User.init(
  {
     // define id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is equivelent of SQL `NOT NULL` option
      allowNull: false,
      // instruct that this is the primary key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
      // define a usrername column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define an email column
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators b4 vreating the table
        validate: {
          isEmail:true
        }
      },
      //  define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least for characters long
          len: [4]
        }
      }
  },
  {
    hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        // set up beforeUpdate  lifecycle "hook" functionality
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
    },
      // pass in our imported sequelize connection (the direct connection to our database)
     sequelize,
     // don't automatically create createdAt/updatedAt timestamp fields
     timestamps: false,
    // don't pluralize name of database table
     freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
     underscored: true,
     // make it so our model name stays lowercase in the database
     modelName: 'user'
  },
);

module.exports = User;