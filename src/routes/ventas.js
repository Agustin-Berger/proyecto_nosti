const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Usuario, Venta } = require("../db");
const venta = require("../../models/Venta");

async function getClientes() {
  console.log("entre a getClientes");
  const usuarios = await venta.findAll();
  let cliente = usuarios.map((e) => {
    return {
      fecha: e.fecha,
      total: e.totales,
      laboratorio: e.laboratorio.map(),
      concepto: e.conceptos.map(),
      documento: e.documento,
      anotacion: e.anotacion,
    };
  });
  console.log("los clientes :", cliente);
  return cliente;
}
async function getVentas() {
  const ventas = await Venta.findAll();

  return ventas;
}

module.exports = {
  getClientes,
  getVentas,
};
