const Itinerary = require("../models/itineraryModel");

class ItineraryRepository {
  async createItinerary(itineraryData) {
    const itinerary = new Itinerary(itineraryData);
    return await itinerary.save();
  }

  async getItineraryWithId(itineraryId) {
    return await Itinerary.findById(itineraryId);
  }

  async getItineraries() {
    return await Itinerary.find();
  }

  async updateItinerary(id, updateData) {
    return await Itinerary.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteItinerary(id) {
    return await Itinerary.findByIdAndDelete(id);
  }

  async searchItineraries(filters) {
    const { query, startDate, endDate, location } = filters;
    const searchQuery = {};

    if (query) {
      searchQuery.title = { $regex: query, $options: "i" };
    }

    if (startDate) {
      searchQuery.trip_start_date = { $gte: new Date(startDate) };
    }

    if (endDate) {
      searchQuery.trip_end_date = { $lte: new Date(endDate) };
    }

    if (location) {
      searchQuery["destinations.location"] = {
        $regex: location,
        $options: "i",
      };
    }

    return await Itinerary.find(searchQuery);
  }
}

module.exports = new ItineraryRepository();
