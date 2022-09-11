import mongoose from "mongoose";

const AthleteSchema = new mongoose.Schema({
  athleteID: {
    type: String,
    required: [true, "Must provide ID"],
    trim: true,
    maxlength: [30, "ID cannot be more than 30 characters"],
  },
  first_name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  style: {
    type: String,
    required: [true, "Must provide swimming style"],
    trim: true,
    enum: {
      values: ["Backstroke", "Breaststroke", "Butterfly", "Freestyle"],
      message: "{VALUE} style is not supported",
    },
  },
  pref: {
    type: String,
    default: "None",
  },
  solved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Athlete = mongoose.model("Athlete", AthleteSchema);
export { Athlete, AthleteSchema };
