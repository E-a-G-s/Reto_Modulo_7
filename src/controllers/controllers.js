import db from "../db/db.js";
import { postDb, deleteNombre, getDbPaisRango } from "../models/models.js";

export const getDb = async (req, res) => {
  try {
    let consulta = await db.query("SELECT * FROM paises_pib");
    return res.status(200).json(consulta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Error al cargar tabla." });
  }
};

export const getDbCreciendo = async (req, res) => {
  try {
    let consulta = await db.query(
      "SELECT nombre,pib_2019,pib_2020,pib_2020-pib_2019 AS diference from paises_pib WHERE pib_2020-pib_2019>0 ORDER by diference DESC"
    );
    //console.log(consulta.rows);
    return res.status(200).json(consulta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Error consulta ." });
  }
};

export const getDbDecreciendo = async (req, res) => {
  try {
    let consulta = await db.query(
      "SELECT nombre,pib_2019,pib_2020,pib_2019-pib_2020 AS diference FROM paises_pib WHERE pib_2020<pib_2019 ORDER by diference ASC"
    );
    //console.log(consulta.rows);
    return res.status(200).json(consulta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Error consulta ." });
  }
};

export const postPais = async (req, res) => {
  try {
    const { nombre, pib_2019, pib_2020 } = req.body;
    if (!nombre || !pib_2019 || !pib_2020) {
      return res.status(400).json({ message: "Faltan datos" });
    }
    let nuevoPais = {
      nombre,
      pib_2019,
      pib_2020,
    };
    // console.log(nuevoCliente);
    const result = await postDb(nuevoPais);
    res.status(200).json({ data: result, message: "Agregado correctamente." });
  } catch (error) {
    res.status(400).json({ error, message: "YA EXISTE PAIS" });
  }
};

export const deletePaisNombre = async (req, res) => {
  try {
    let { nombre } = req.params;
    //console.log(nombre);
    const result = await deleteNombre(nombre);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const rangoPib = async (req, res) => {
  try {
    const { rangoMin, rangoMax } = req.params;
    const result = await getDbPaisRango(rangoMin, rangoMax);
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error, message: "NO EXISTE RANGO" });
  }
};
