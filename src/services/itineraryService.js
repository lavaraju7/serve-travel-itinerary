const itineraryRepository = require("../repositories/itineraryRepository");

class ItineraryService {
  async createItinerary(itinerary) {
    const existingItinerary = await itineraryRepository.getItineraryWithId(
      itinerary.id
    );
    if (existingItinerary) {
      throw new Error("Itinerary already exists.");
    }
    return await itineraryRepository.createItinerary(itinerary);
  }

  async updateItinerary(itinerary) {
    const existingItinerary = await itineraryRepository.getItineraryWithId(
      itinerary.id
    );
    if (!existingItinerary) {
      throw new Error("Itinerary not found in the database");
    }
    return await itineraryRepository.updateItinerary(itinerary.id, itinerary);
  }

  async getItineraryById(id) {
    const itinerary = await itineraryRepository.getItineraryWithId(id);
    if (!itinerary) {
      throw new Error("Itinerary not found");
    }
    return itinerary;
  }

  async getItineraries() {
    return await itineraryRepository.getItineraries();
  }

  async deleteItinerary(id) {
    const existingItinerary = await itineraryRepository.getItineraryWithId(id);
    if (!existingItinerary) {
      throw new Error("Itinerary not found");
    }
    return await itineraryRepository.deleteItinerary(id);
  }

  async searchItineraries(filters) {
    return await itineraryRepository.searchItineraries(filters);
  }

  async addActivity(itineraryId, activityData) {
    const itinerary = await this.getItineraryById(itineraryId);

    const destinationIndex = activityData.destinationIndex;
    if (
      destinationIndex === undefined ||
      !itinerary.destinations[destinationIndex]
    ) {
      throw new Error("Invalid destination index");
    }

    if (!itinerary.destinations[destinationIndex].activities) {
      itinerary.destinations[destinationIndex].activities = [];
    }

    itinerary.destinations[destinationIndex].activities.push({
      ...activityData,
      id: Date.now().toString(), // Simple ID generation
    });

    return await itineraryRepository.updateItinerary(itineraryId, itinerary);
  }

  async updateActivity(itineraryId, activityId, activityData) {
    const itinerary = await this.getItineraryById(itineraryId);

    let activityFound = false;
    for (const destination of itinerary.destinations) {
      const activityIndex = destination.activities?.findIndex(
        (a) => a.id === activityId
      );
      if (activityIndex !== -1) {
        destination.activities[activityIndex] = {
          ...destination.activities[activityIndex],
          ...activityData,
          id: activityId,
        };
        activityFound = true;
        break;
      }
    }

    if (!activityFound) {
      throw new Error("Activity not found");
    }

    return await itineraryRepository.updateItinerary(itineraryId, itinerary);
  }

  async removeActivity(itineraryId, activityId) {
    const itinerary = await this.getItineraryById(itineraryId);

    let activityFound = false;
    for (const destination of itinerary.destinations) {
      const activityIndex = destination.activities?.findIndex(
        (a) => a.id === activityId
      );
      if (activityIndex !== -1) {
        destination.activities.splice(activityIndex, 1);
        activityFound = true;
        break;
      }
    }

    if (!activityFound) {
      throw new Error("Activity not found");
    }

    return await itineraryRepository.updateItinerary(itineraryId, itinerary);
  }
}

module.exports = new ItineraryService();
