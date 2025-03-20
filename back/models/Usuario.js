const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM({ values: ["admin", "usuario"] }),
        allowNull: false,
        defaultValue: "usuario",
      },
    },
    {
      tableName: "usuario",
      timestamps: false,
      freezeTableName: true,
    }
  );

  // Hook para hashear la contraseña antes de crear el usuario
  Usuario.beforeCreate(async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(usuario.contraseña, salt);
  });

  return Usuario;
};
