import db from "../db/db.js";

export const postDb = (pais) => {
  return new Promise(async (resolve, reject) => {
    try {
      //console.log(rut);
      let tabla = await db.query(
        `INSERT INTO paises_pib(nombre, pib_2019,pib_2020) VALUES($1, $2, $3)`,
        [pais.nombre, pais.pib_2019, pais.pib_2020]
      );
      resolve(tabla);
    } catch (error) {
      console.log(error.detail);
      reject(error);
    }
  });
};

export const deleteNombre = (nombre) => {
  return new Promise(async (resolve, reject) => {
    try {
      //console.log(nombre);
      let tabla = await db.query(`DELETE FROM paises_pib WHERE nombre=$1`, [
        nombre,
      ]);
      //console.log(tabla);
      return resolve(tabla.rows);
    } catch (error) {
      return reject("Error al cargar");
    }
  });
};

export const getDbPaisRango = (rangoMin, rangoMax) => {
  return new Promise(async (resolve, reject) => {
    //console.log(rangoMin, rangoMax);
    try {
      let tabla = await db.query(
        "select nombre, pib_2019,pib_2020 FROM paises_pib WHERE pib_2020 BETWEEN $1 AND $2 ",
        [rangoMin, rangoMax]
      );
      // console.log(tabla.rows);
      return resolve(tabla.rows);
    } catch (error) {
      //console.log(error);
      reject(error);
    }
  });
};
