import { StatusCodes } from "http-status-codes";
import matchModel from "../models/match.js";
import userModel from "../models/user.js";

export async function createMatch (req, res, next) {
  try {
    const { body } = req;
    const match = await new matchModel(body).save();
    res.status(StatusCodes.OK).send({
      message: "Successfully created Match",
      match
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function getMatches (req, res, next) {
  try {
    const { query: filter } = req;
    const matches = await matchModel.find(filter);
    res.status(StatusCodes.OK).send({
      message: "Successfully fetched matches",
      matches
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function updateMatch (req, res, next) {
  try {
    const { query: { matchId }, body } = req;

    const updatedMatch = await matchModel.findOneAndUpdate({ matchId }, body, { new: true });
    res.status(StatusCodes.OK).send({
      message: 'Successfully updated match info',
      updatedMatch
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function deleteMatch (req, res, next) {
  try {
    const { query: { matchId } } = req;
    await matchModel.deleteOne({matchId});
    res.status(StatusCodes.OK).send();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    }); 
  }
}

export async function upsertPrediction (req, res, next) {
  try {
    const { query: { userId, matchId }, body } = req;
    const match = await matchModel.findOne({ matchId });

    const predictionInd = match.predictions.findIndex(p => p.userId === userId);
    const updateBody = {}, predictionBody = { userId, ...body };
    if (predictionInd !== -1)
      updateBody[`predictions.${predictionInd}`] = predictionBody;
    else
      updateBody.$push = { predictions: predictionBody };

    await matchModel.findOneAndUpdate({ matchId }, updateBody);
    res.status(StatusCodes.OK).send({
      message: "Successfuly saved prediction",
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });
  }
}

export async function removePrediction (req, res, next) {
  try {
    const { query: { userId, matchId } } = req;
    const match = await matchModel.findOne({ matchId });

    const newPredictions = match.predictions.filter(p => p.userId === userId);
    await matchModel.findOneAndUpdate({ matchId }, { $set: { predictions: newPredictions } });
    res.status(StatusCodes.OK).send();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
      stackTrace: error.stack
    });    
  }
}
