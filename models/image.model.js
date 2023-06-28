const { Sequelize, Model, DataTypes } = require("sequelize");

const IMAGE_TABLE = "img";

const ImageSchema = {
  id: {
    field: "id_image",
    unique: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rutaImg: {
    field: "ruta_img",
    allowNull: false,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
};

class Image extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'Image',
      timestamps: false
    }
  }
}

module.exports = {ImageSchema, Image}
