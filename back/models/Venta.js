const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Venta",
    {
      id: {
        type: DataTypes.UUID, // Cambia a UUID
        defaultValue: UUIDV4, // Esto genera el UUID automáticamente
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      laboratorio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      totales: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      conceptos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      anotacion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      documento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "usuario",
          key: "id",
        },
      },
      // timestamps: debe ir fuera de la definición de atributos
    },
    {
      timestamps: false,
    }
  );
};
