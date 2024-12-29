const itineraryRepository = require('../repositories/itineraryRepository');

class ItineraryService {
  async createItinerary(itinerary) {
    const existingHero = await itineraryRepository.getItineraryWithId(itinerary.id);
    if (existingHero) {
      throw new Error('Super Hero already exists.');
    }
    return await itineraryRepository.createItinerary(itinerary);
  }

  async updateItinerary(itinerary) {
    const existingHero = await itineraryRepository.getItineraryWithId(itinerary.id);
    if (!existingHero) {
      throw new Error('Super Hero data not available in the database');
    }
    return await itineraryRepository.updateItinerary(itinerary.id,itinerary);
  }

  async getItineraryById(id) {
    return await itineraryRepository.getItineraryWithId(id);
  }
}

module.exports = new ItineraryService();
