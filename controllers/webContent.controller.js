import { WebContent } from "../models/webContent.model.js";
import upload from "../multer/multerConfig.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// create web content
export const createWebContent = (req, res) => {
  // Use multer to handle the image upload
  upload.single("img")(req, res, async (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res
        .status(500)
        .json({ message: "Error uploading file", error: err });
    }

    console.log("Uploaded File:", req.file);

    // Create a new web content entry
    const newContent = new WebContent({
      title: req.body.title,
      description: req.body.description,
      img: req.file ? req.file.path : null,
      buttonText1: req.body.buttonText1,
      buttonText2: req.body.buttonText2,
      sectionHeading: req.body.sectionHeading,
    });

    try {
      const savedContent = await newContent.save();
      res.status(201).json(savedContent);
    } catch (error) {
      res.status(500).json({ message: "Error saving content", error });
    }
  });
};

// Get web content
export const getWebContent = async (req, res) => {
  try {
    const content = await WebContent.find();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving content", error });
  }
};

// Edit web content
export const editWebContent = async (req, res) => {
  const { id } = req.params;

  // Use multer to handle the image upload
  upload.single("img")(req, res, async (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res
        .status(500)
        .json({ message: "Error uploading file", error: err });
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      img: req.file ? req.file.path : null,
      buttonText1: req.body.buttonText1,
      buttonText2: req.body.buttonText2,
      sectionHeading: req.body.sectionHeading,
    };

    try {
      const updatedContent = await WebContent.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
      if (!updatedContent) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: "Error updating content", error });
    }
  });
};

// Delete web content
export const deleteWebContent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContent = await WebContent.findByIdAndDelete(id);
    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Delete the associated image file if it exists
    if (deletedContent.img) {
      const imagePath = path.join(__dirname, '..', deletedContent.img); 

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting content", error: error.message });
  }
};
