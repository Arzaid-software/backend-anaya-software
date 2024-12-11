import express from "express";
import {
  createWebContent,
  getWebContent,
  editWebContent,
  deleteWebContent,
} from "../controllers/webContent.controller.js";
import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createWebContent);
router.get("/get", getWebContent);
router.put("/edit/:id", isAdminAuthenticated, editWebContent);
router.delete("/delete/:id", isAdminAuthenticated, deleteWebContent);

export default router;
