import mongoose from "mongoose";

const navigationCategorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['SOFTWARE', 'DIGITAL_MARKETING', 'EDUCATION']
    },
    categories: [{
      categoryName: {
        type: String,
        required: true
      },
      items: [{
        title: {
          type: String,
          required: true
        },
        href: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        icon: {
          type: String,
          required: false
        }
      }]
    }]
  },
  { timestamps: true }
);

export const NavigationCategory = mongoose.model("NavigationCategory", navigationCategorySchema);