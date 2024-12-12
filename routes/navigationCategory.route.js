import express from "express";
import {
  createNavigationCategory,
  getNavigationCategories,
  editNavigationCategory,
  deleteNavigationCategory,
  deleteAllNavigationCategories
} from "../controllers/navigationCategory.controller.js";
import { isAdminAuthenticated } from "../middleware/isAdminAuthenticated.js";

const router = express.Router();

router.post("/create", isAdminAuthenticated, createNavigationCategory);
router.get("/get", getNavigationCategories);
router.put("/edit/:id", isAdminAuthenticated, editNavigationCategory);
router.delete("/delete/:id", isAdminAuthenticated, deleteNavigationCategory);
router.delete("/delete-all", isAdminAuthenticated, deleteAllNavigationCategories);

export default router;
