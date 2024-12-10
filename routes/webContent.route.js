import express from "express";
import {
  createWebContent,
  getWebContent,
} from "../controllers/webContent.controller.js";
import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";
import { editWebContent } from "../controllers/webContent.controller.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createWebContent);
router.get("/get", getWebContent);
router.put("/edit/:id", isAdminAuthenticated, editWebContent);

export default router;
