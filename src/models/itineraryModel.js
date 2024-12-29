const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  activity_type: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Number, required: true }, // Stored as string in "HH:mm" format
});

const destinationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  transportation_type: { type: String, required: true },
  date_time: { type: Date, required: true }, // Combined date and time
  time: { type: String, required: true }, // Stored as string in "HH:mm" format
  activities: [activitySchema], // Array of activities
});

const itinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  itinerary_id: { type: Number, required: true },
  trip_start_date: { type: Date, required: true },
  trip_end_date: { type: Date, required: true },
  destinations: [destinationSchema], // Array of destinations
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model("Itinerary", itinerarySchema);
