const { Router } = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const modelsV = require("./ventas");
const { Usuario, Venta } = require("../db");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const secretKey = "tu_clave_secreta";
const cookieParser = require("cookie-parser");
//const venta = require("../../back/models/Ventas");
//const modelsU = require("./routes/");
//const modelsC = require("./routes/clientes");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const user = req.usuario; // Suponiendo que ya tienes el usuario extraído del JWT

    if (!rolesPermitidos.includes(user.rol)) {
      return res
        .status(403)
        .json({ mensaje: "No tienes permisos para acceder a esta ruta" });
    }

    next();
  };
};

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Asegúrate de que el token se extrae correctamente

  if (!token) {
    return res.status(403).send("No se proporcionó token.");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido."); // Este mensaje se mostrará si el token es inválido
    }

    req.userId = decoded.id; // Aquí asignas el ID del usuario decodificado
    next();
  });
};

// Configurar los routers
// Ejemplo: router.use("/auth", authRouter);
router.post("/ingresar", async (req, res) => {
  const { usuario, contraseña } = req.body;
  console.log(usuario, contraseña, "llegaron los apramteros");
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { usuario },
    });
    if (!usuarioEncontrado) {
      res.status(404).send("usuario no encontrado");
    }
    const esContraseñaValida = await bcrypt.compare(
      contraseña,
      usuarioEncontrado.contraseña
    );
    if (!esContraseñaValida) {
      res.status(404).send("contraseña incorrecta");
    }
    const usuarioT = {
      id: usuarioEncontrado.id,
      usuario: usuarioEncontrado.usuario,
      rol: usuarioEncontrado.rol,
    };
    const token = jwt.sign(usuarioT, secretKey, { expiresIn: "8h" });
    console.log("ya estoy en el res ");
    res.cookie(
      "token",
      token,
      {
        httpOnly: true, // Esto asegura que el cookie no sea accesible desde JavaScript del frontend
        secure: process.env.NODE_ENV === "production", // Solo usar secure en producción (HTTPS)
        maxAge: 8 * 60 * 60 * 1000,
      },
      console.log("ya hice el log")
    ); // Cookie expira en 8 horas}
    return res
      .status(200)
      .json({ message: "Inicio de sesión exitoso", usuarioT });
  } catch (error) {
    res.status(500).send(error, "no se pudo ingresar");
  }
});
router.post("/cerrar-sesion", verifyToken, async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "Sesion cerrada" });
});

router.post("/crearUsuario", async (req, res) => {
  try {
    const { usuario, contraseña, rol } = req.body;
    console.log(usuario, contraseña, rol, "llegaron los apramteros");
    const nuevoUsuario = await Usuario.create({
      usuario,
      contraseña,
      rol,
    });
    console.log("intente");
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.post("/ventas", verifyToken, async (req, res) => {
  try {
    console.log("entro");
    const { documento, fecha, anotacion, totales, conceptos, laboratorio } =
      req.body;
    const usuarioExistente = await Usuario.findByPk(req.userId);
    console.log(usuarioExistente, "usuarioExistente");
    if (!usuarioExistente) {
      return res.status(404).send("Usuario no encontrado.");
    }
    if (!documento || !fecha || !totales || !conceptos || !laboratorio) {
      return res.status(400).json({ message: "Faltan datos requeridos." });
    }
    console.log("antes de ventaNUeva");
    console.log(req.userId, "el usuer.id");
    const ventaNueva = await Venta.create({
      documento,
      laboratorio,
      fecha,
      anotacion,
      totales,
      conceptos,
      userId: req.userId,
    });
    console.log("intente");
    res.status(201).json(ventaNueva);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.get("/ping", async (req, res) => {
  try {
    res.status(200).json("PONG");
  } catch (error) {
    console.log(error);
  }
});
router.get("/todasLasVentas", verifyToken, async (req, res) => {
  try {
    console.log("entro");
    let ventas = await modelsV.getVentas();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/cliente", verifyToken, async (req, res) => {
  try {
    let { documento } = req.query;
    console.log(documento);
    console.log("entro");
    let cliente = await modelsV.getVentas();
    console.log(cliente);
    if (documento) {
      console.log("entro al if");
      const cliente1 = await cliente.filter((e) => e.documento === documento);
      console.log(cliente1);
      res.status(200).json(cliente1);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get("/fecha", verifyToken, async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log("fechas", startDate, endDate);
  if (startDate > endDate) {
    return res.status(400).json({
      error: "La fecha de inicio no puede ser mayor a la fecha final",
    });
  }
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  try {
    let filtrado = await modelsV.getVentas();
    let filtradoFinal = filtrado.filter(
      (e) => e.fecha >= startDate && e.fecha <= endDate
    );
    res.status(200).json(filtradoFinal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener eventos" });
  }
});

module.exports = router;
