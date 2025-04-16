import express from "express";
import { allItems, addItem, updateItem, deleteItem } from "../controller/itemController.js";

const router = express.Router();

router.get("/all-item", allItems);
router.post("/add-item", addItem);
router.put("/update-item", updateItem);
router.delete("/delete-item/:id", deleteItem)

export default router;
