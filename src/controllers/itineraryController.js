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

  async getItineraries(req, res) {
    try {
      const data = await itineraryService.getItineraries();
      res
        .status(200)
        .json({ success: true, message: "Itineraries fetched", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async deleteItinerary(req, res) {
    try {
      await itineraryService.deleteItinerary(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Itinerary deleted successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async searchItineraries(req, res) {
    try {
      const { query, startDate, endDate, location } = req.query;
      const filters = {
        query,
        startDate,
        endDate,
        location,
      };
      const data = await itineraryService.searchItineraries(filters);
      res.status(200).json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async addActivity(req, res) {
    try {
      const { id } = req.params;
      const activityData = req.body;
      const updatedItinerary = await itineraryService.addActivity(
        id,
        activityData
      );
      res.status(201).json({
        success: true,
        message: "Activity added successfully",
        data: updatedItinerary,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async updateActivity(req, res) {
    try {
      const { id, activityId } = req.params;
      const activityData = req.body;
      const updatedItinerary = await itineraryService.updateActivity(
        id,
        activityId,
        activityData
      );
      res.status(200).json({
        success: true,
        message: "Activity updated successfully",
        data: updatedItinerary,
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  async removeActivity(req, res) {
    try {
      const { id, activityId } = req.params;
      await itineraryService.removeActivity(id, activityId);
      res
        .status(200)
        .json({ success: true, message: "Activity removed successfully" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }
}

module.exports = new ItineraryController();
