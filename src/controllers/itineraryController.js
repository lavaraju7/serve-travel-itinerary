const itineraryService = require("../services/itineraryService");

class ItineraryController {
  async createItinerary(req, res) {
    try {
      const itineraryData = req.body;
      const user = await itineraryService.createItinerary(itineraryData);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async getItinerary(req, res) {
    try {
      const itinerary = await itineraryService.getItineraryById(req.params.id);
      if (!itinerary) {
        return res.status(404).json({
          success: false,
          message: "Itinerary not found in database",
        });
      }
      res.status(200).json({ success: true, data: itinerary[0] });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  async updateItinerary(req, res) {
    try {
      const itineraryData = req.body;
      await itineraryService.updateItinerary(itineraryData);
      res.status(201).json({ success: true, message: "Itinerary Updated" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new ItineraryController();
