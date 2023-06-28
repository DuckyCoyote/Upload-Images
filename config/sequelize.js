const {Sequelize} = require("sequelize");
const setupModels = require("../models");

const USER = encodeURIComponent("root");
const PASSWORD = encodeURIComponent("1234");
const URI = `mysql://${USER}:${PASSWORD}@localhost:3306/archivos_prueba`;

const sequelize = new Sequelize(URI, {
  dialect: "mysql",
  logging: (msg) => console.log(msg),
});

setupModels(sequelize);

module.exports = sequelize;
