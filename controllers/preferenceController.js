const axios = require("axios");
const User = require("../models/user");

exports.getPreferences = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user.preferences);
  } catch (error) {
    next(error);
  }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    const { country, category } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          "preferences.country": country,
          "preferences.category": category,
        },
      },
      { new: true }
    );
    res.json({
      message: "Preferences updated successfully",
      preferences: user.preferences,
    });
  } catch (error) {
    next(error);
  }
};
