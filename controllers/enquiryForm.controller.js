import { EnquiryForm } from "../models/enquiryForm.model.js";

export const createEnquiryForm = async (req, res) => {
  try {
    const enquiryDetails = {
      fullname: req.body.fullname,
      email: req.body.email,
      mobileno: req.body.mobileno,
      enquirypurpose: req.body.enquiry,
      enquirymessage: req.body.message,
    };

    const addnewEnquiry = new EnquiryForm(enquiryDetails);
    const savedData = await addnewEnquiry.save();
    if (!savedData) {
      res.status(500).json({
        message: "Data not found",
      });
    }
    res.status(200).json({
      message: "Fill data successfully",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: "Data does not found",
      status: "error",
    });
  }
};

export const deleteEnquiryForm = async (req, res) => {
  try {
    const Id = req.query._id;
    const DeleteLeads = await EnquiryForm.findByIdAndDelete(Id);
    res.status(200).json({
      message: `Lead ${Id} delete successfully`,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: "ID does not found",
      status: "fail",
    });
  }
};



