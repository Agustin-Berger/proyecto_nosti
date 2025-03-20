require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

// Crear una instancia de Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

// Importar y definir los modelos
const UsuarioModel = require("../back/models/Usuario")(sequelize);
const VentaModel = require("../back/models/Venta")(sequelize);

// Definir relaciones
// Relación muchos a muchos entre Usuario y Venta
UsuarioModel.hasMany(VentaModel, { foreignKey: "userId" });
VentaModel.belongsTo(UsuarioModel, { foreignKey: "userId" });

// Sincronizar la base de datos
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((error) => {
    console.error("Error al sincronizar tablas:", error);
  });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importar la conexión { conn } = require('./db.js');
};
console.log("prueba");
