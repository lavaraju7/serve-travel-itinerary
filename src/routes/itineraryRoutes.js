const express = require("express");
const itineraryController = require("../controllers/itineraryController");
const validate = require("../middlewares/validator");
const itinerarySchema = require("../schemas/itinerarySchemas");
const { activitySchema } = require("../schemas/itinerarySchemas");

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

// New routes
router.delete("/itinerary/:id", itineraryController.deleteItinerary);
router.get("/itineraries/search", itineraryController.searchItineraries);

// Activity management routes
router.post(
  "/itinerary/:id/activity",
  validate(activitySchema),
  itineraryController.addActivity
);
router.put(
  "/itinerary/:id/activity/:activityId",
  validate(activitySchema),
  itineraryController.updateActivity
);
router.delete(
  "/itinerary/:id/activity/:activityId",
  itineraryController.removeActivity
);

module.exports = router;
