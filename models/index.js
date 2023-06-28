const { Image, ImageSchema } = require('./image.model');

function setupModels(sequelize) {
  Image.init(ImageSchema, Image.config(sequelize))
}

module.exports = setupModels;