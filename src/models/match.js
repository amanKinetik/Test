import mongoose from "mongoose";
import * as uuid from 'uuid';
import mongooseUniqueValidator from "mongoose-unique-validator";

const { Schema } = mongoose;

const predictionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  winner: {
    type: String
  },
  goals: {
    type: Map,
    of: Number
  }
});

const matchSchema = new Schema({
  matchId: {
    type: String,
    required: true,
    unique: true,
    default: uuid.v4()
  },
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  predictions: {
    type: [predictionSchema],
    default: [],
  }
})

matchSchema.plugin(mongooseUniqueValidator);
const matchModel = mongoose.model('match', matchSchema);
export default matchModel;
