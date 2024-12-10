import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (v) {
          return (
            /[A-Z]/.test(v) &&
            /[a-z]/.test(v) &&
            /\d/.test(v) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(v)
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
