import University from "../models/university.model.js";
import response from "../utils/generateResponse.js";
import mongoose from "mongoose";

export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find({}).populate("reviews");

    if (universities.length === 0) {
      return response(res, 404, false, "Universities data not found");
    }

    res.status(200).json({
      success: true,
      message: "Universites retrieved successfully",
      universities: universities,
    });
  } catch (error) {
    console.log("Error in getUniversities controller", error.message);
    return response(res, 500, false, "Internal server error");
  }
};

export const getSingleUniversity = async (req, res) => {
  try {
    const university = await University.findById(req.params.id).populate(
      "reviews"
    );

    if (!university) {
      return response(res, 404, false, "University not found");
    } else {
      const address = university.location;

      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );

      if (!geocodeResponse.ok) {
        return response(res, 400, false, "Error geocoding location");
      }
      const geocodeData = await geocodeResponse.json();
      if (geocodeData.length === 0) {
        return response(
          res,
          400,
          false,
          `No geocode value found for ${address}`
        );
      }

      const { lat, lon } = geocodeData[0];

      const geocode = { latitude: lat, longitude: lon };

      res.status(200).json({
        success: true,
        message: "University details fetched successfully",
        university,
        geocode,
      });
    }
  } catch (error) {
    console.log(`Error in getSingleUniversity controller ${error.message}`);
    response(res, 500, false, "Internal Server Error");
  }
};

export const addUniversity = async (req, res) => {
  try {
    const {
      name,
      location,
      establishedYear,
      category,
      description,
      websiteUrl,
      logo,
    } = req.body;

    if (
      !name ||
      !location ||
      !establishedYear ||
      !category ||
      !description ||
      !websiteUrl
    ) {
      return response(res, 400, false, "Please enter values in all fields");
    }

    if (!logo) {
      return response(res, 400, false, "Please upload a logo");
    }

    const newUniversity = new University({
      name,
      logo,
      location,
      establishedYear,
      category,
      description,
      websiteUrl,
    });

    await newUniversity.save();

    res.status(201).json({
      success: true,
      message: "University added successfully",
      university: newUniversity,
    });
  } catch (error) {
    console.log("Error in addUniversity controller", error.message);
    response(res, 500, false, "Internal server error");
  }
};

export const updateUniversity = async (req, res) => {
  try {
    const universityId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(universityId)) {
      return response(res, 400, false, "Invalid university ID");
    }

    const {
      name,
      logo,
      location,
      establishedDate,
      category,
      description,
      websiteUrl,
    } = req.body;

    if (
      !name ||
      !logo ||
      !location ||
      !establishedDate ||
      !category ||
      !description ||
      !websiteUrl
    ) {
      return response(res, 400, false, "Please enter values in all fields");
    }

    // finding the university and applying the update values
    const updatedUniversity = await University.findByIdAndUpdate(
      universityId,
      {
        name,
        logo,
        location,
        establishedDate,
        category,
        description,
        websiteUrl,
      },
      { new: true } // for signaling to output the modified values
    );

    if (!updatedUniversity) {
      return response(res, 404, false, "University not found");
    }

    res.status(200).json({
      success: true,
      message: "University updated successfully",
      university: updatedUniversity,
    });
  } catch (error) {
    console.log("Error in editUniversity controller", error.message);
    response(res, 500, false, "Internal server error");
  }
};

export const deleteUniversity = async (req, res) => {
  try {
    const universityId = req.params.id;

    await University.findByIdAndDelete(universityId);

    res
      .status(200)
      .json({ success: true, message: "University deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUniversity controller", error.message);
    response(res, 500, false, "Internal server error");
  }
};

export const searchUniversity = async (req, res) => {
  try {
    const requestedQuery = req.query.q;
    const regex = new RegExp(requestedQuery, "i", "g");

    const university = await University.find({
      $or: [
        {
          name: regex,
        },
      ],
    }).populate("reviews");

    res.status(200).json({
      success: true,
      university: university,
    });
  } catch (error) {
    console.log("Error in searchUniversity controller", error.message);
    response(res, 500, false, "Internal Server Error");
  }
};
