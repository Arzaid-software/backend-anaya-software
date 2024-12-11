import mongoose from "mongoose";

const educationContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    buttonText1: {
      type: String,
      required: true, 
    },
    buttonText2: {
      type: String,
      required: true, 
    },
    sectionHeading: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

export const EducationContent = mongoose.model("EducationContent", educationContentSchema);