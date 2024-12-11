import mongoose from "mongoose";

const enquiryFormSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    mobileno: {
      type: Number,
      require: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 10-digit number!`,
      },
    },

    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    enquirypurpose: {
      type: String,
      require: true,
    },
    enquirymessage: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const EnquiryForm = mongoose.model("EnquiryForm", enquiryFormSchema);
