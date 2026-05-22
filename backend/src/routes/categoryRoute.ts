import express  from "express";
import { deleteCategoryById, getCategory, saveCategory, showCategoryById, updateCategoryById } from "../controlers/categoriesControler.js";

const router = express.Router();

router.get("/", getCategory);
router.post("/", saveCategory);
router.get("/:id", showCategoryById);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById)


export default router;