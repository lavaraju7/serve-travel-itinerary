const Joi = require("joi");

const activitySchema = Joi.object({
  activity_type: Joi.string().required().messages({
    "string.empty": "Activity type is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  time: Joi.number().required().messages({
    "string.empty": "Time is required",
  }),
});

const destinationSchema = Joi.object({
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  transportation_type: Joi.string().required().messages({
    "string.empty": "Transportation type is required",
  }),
  date_time: Joi.date().iso().required().messages({
    "date.base": "Date-time must be a valid ISO date",
    "any.required": "Date-time is required",
  }),
  time: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.empty": "Time is required",
      "string.pattern.base": "Time must be in HH:mm format",
    }),
  activities: Joi.array().items(activitySchema).required().messages({
    "array.base": "Activities must be an array",
  }),
});

const itinerarySchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  trip_start_date: Joi.date().iso().required().messages({
    "date.base": "Trip start date must be a valid ISO date",
    "any.required": "Trip start date is required",
  }),
  trip_end_date: Joi.date().iso().required().messages({
    "date.base": "Trip end date must be a valid ISO date",
    "any.required": "Trip end date is required",
  }),
  destinations: Joi.array().items(destinationSchema).required().messages({
    "array.base": "Destinations must be an array",
  }),
});

module.exports = itinerarySchema;
