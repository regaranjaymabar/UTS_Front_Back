import express from "express";
import { deleteUserById, getUsers, saveUser, showUserById, updateUserById } from "../controlers/userControler.js"; 

const router = express.Router();
router.get("/", getUsers);               
router.post("/", saveUser);              
router.get("/:id", showUserById);        
router.put("/:id", updateUserById);      
router.delete("/:id", deleteUserById);   

export default router;