const express = require("express");
const {
  updatePreferences,
  getPreferences,
} = require("../controllers/preferenceController");
const { authenticate } = require("../middleware/auth");
const { validatePreferences } = require("../middleware/validation");

const router = express.Router();

router.get("/preferences", authenticate, getPreferences);
router.put(
  "/preferences",
  authenticate,
  validatePreferences,
  updatePreferences
);

module.exports = router;
