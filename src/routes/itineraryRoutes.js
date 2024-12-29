const express = require('express');
const itineraryController = require('../controllers/itineraryController');
const validate = require('../middlewares/validator');
const itinerarySchema = require('../dtos/itineraryDto');

const router = express.Router();

router.post('/itinerary', validate(itinerarySchema),itineraryController.createItinerary);
router.put('/itinerary',validate(itinerarySchema) ,itineraryController.updateItinerary);
router.get('/itinerary/:id',itineraryController.getItinerary);

module.exports = router;
