const Itinerary = require("../models/itineraryModel");

class ItineraryRepository {
  async createItinerary(itineraryData) {
    const itinerary = new Itinerary(itineraryData);
    return await itinerary.save();
  }

  async getItineraryWithId(itineraryId) {
    return await Itinerary.find({ itinerary_id: itineraryId });
  }

  async findAll() {
    return await Itinerary.query().select();
  }

  async updateItinerary(id, updateData) {
    return await Itinerary.query().update(updateData).where("id", id);
  }

  async deleteById(id) {
    return await Itinerary.findByIdAndDelete(id);
  }
}

module.exports = new ItineraryRepository();
