import { NavigationCategory } from "../models/navigationCategory.model.js";

export const createNavigationCategory = async (req, res) => {
  try {
    const { type, categories } = req.body;

    // Check if a category with the same type already exists
    const existingCategory = await NavigationCategory.findOne({ type });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: `Navigation category for type ${type} already exists`,
      });
    }

    const newNavigationCategory = new NavigationCategory({
      type,
      categories,
    });

    const savedCategory = await newNavigationCategory.save();

    res.status(201).json({
      success: true,
      data: savedCategory,
      message: "Navigation category created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating navigation category",
      error: error.message,
    });
  }
};

export const getNavigationCategories = async (req, res) => {
  try {
    const { type } = req.query;

    const query = type ? { type } : {};
    const categories = await NavigationCategory.find(query);

    res.status(200).json({
      success: true,
      data: categories,
      message: "Navigation categories retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving navigation categories",
      error: error.message,
    });
  }
};

export const editNavigationCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, categories } = req.body;

    // Check if the category exists
    const existingCategory = await NavigationCategory.findById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Navigation category not found",
      });
    }

    // Update the category
    const updatedCategory = await NavigationCategory.findByIdAndUpdate(
      id,
      { type, categories },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Navigation category updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating navigation category",
      error: error.message,
    });
  }
};

export const deleteNavigationCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category exists
    const existingCategory = await NavigationCategory.findById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Navigation category not found",
      });
    }

    // Delete the category
    await NavigationCategory.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Navigation category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting navigation category",
      error: error.message,
    });
  }
};

export const deleteAllNavigationCategories = async (req, res) => {
  try {
    // Delete all navigation categories
    const result = await NavigationCategory.deleteMany({});

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} navigation categories`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting all navigation categories",
      error: error.message,
    });
  }
};
