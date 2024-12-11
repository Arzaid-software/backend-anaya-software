import express from "express";

import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";
import {
  createEducationContent,
  deleteEducationContent,
  editEducationContent,
  getEducationContent,
} from "../controllers/educationContent.controller.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createEducationContent);
router.get("/get", getEducationContent);
router.put("/edit/:id", isAdminAuthenticated, editEducationContent);
router.delete("/delete/:id", isAdminAuthenticated, deleteEducationContent);

export default router;
