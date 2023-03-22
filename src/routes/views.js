import express from "express";
const router = express.Router();

import {
  getDb,
  getDbCreciendo,
  getDbDecreciendo,
  postPais,
  deletePaisNombre,
  rangoPib,
} from "../controllers/controllers.js";

router.get("/", getDb, (req, res) => {});
router.get("/pibaumento", getDbCreciendo, (req, res) => {});
router.get("/pibdisminuir", getDbDecreciendo, (req, res) => {});
router.post("/creandopais", postPais, (req, res) => {});
router.delete("/paises/:nombre", deletePaisNombre, (req, res) => {});
router.get("/rango/:rangoMin/:rangoMax", rangoPib, (req, res) => {});

router.get("/home", (req, res) => {
  res.render("home");
});

export default router;
