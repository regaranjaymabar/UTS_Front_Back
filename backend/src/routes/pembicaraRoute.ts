import express from  "express";
import { deletePembicaraById, getPembicara, savePembicara, showPembicaraById, updatePembicaraById } from "../controlers/pembicaraControler.js";
const router = express.Router();

router.get("/", getPembicara);
router.post("/", savePembicara);
router.get("/:id", showPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById)

export default router;