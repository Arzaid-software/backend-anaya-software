import express from "express";
import {
  createEnquiryForm,
  deleteEnquiryForm,
} from "../controllers/enquiryForm.controller.js";

const router = express.Router();

router.post("/create", createEnquiryForm);
router.delete("/delete/:id", deleteEnquiryForm);

export default router;
