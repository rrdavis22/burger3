// set up code to connect node to mysql
// export connection

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/config.json")[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

module.exports = sequelize;
