const express = require("express");
const itineraryController = require("../controllers/itineraryController");
const validate = require("../middlewares/validator");
const itinerarySchema = require("../schemas/itinerarySchemas");

const router = express.Router();

router.post(
  "/itinerary",
  validate(itinerarySchema),
  itineraryController.createItinerary
);
router.put(
  "/itinerary",
  validate(itinerarySchema),
  itineraryController.updateItinerary
);
router.get("/itinerary/:id", itineraryController.getItinerary);
router.get("/itineraries", itineraryController.getItineraries);

module.exports = router;
