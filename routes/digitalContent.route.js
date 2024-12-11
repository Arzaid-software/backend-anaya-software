import express from "express";
import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";

import {
  createDigitalContent,
  editDigitalContent,
  deleteDigitalContent,
  getDigitalContent,
} from "../controllers/digitalContent.controller.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createDigitalContent);
router.get("/get", getDigitalContent);
router.put("/edit/:id", isAdminAuthenticated, editDigitalContent);
router.delete("/delete/:id", isAdminAuthenticated, deleteDigitalContent);

export default router;
