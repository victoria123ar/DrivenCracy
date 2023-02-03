import db from "../db/db.js";
import { choiceVoteArray } from "../services/choiceVoteSchema.js";
import mongoose from "mongoose";

export async function postChoice(req, res) {
  const { title } = req.body;
  const { pollId } = req.body;
  const { error } = choiceVoteArray.validate({ title }, { abortEarly: false });

  const dateNow = new Date();
  try {
    if (!title) {
      return res.sendStatus(422);
    }

    const mongoObjectId = mongoose.Types.ObjectId(String(pollId));
    const SurveyDocument = await db.collection("survey").findOne({
      _id: mongoObjectId,
    });

    if (!SurveyDocument) {
      return res.sendStatus(404);
    }

    const QtdDocuments = await db
      .collection("choice")
      .countDocuments({ title: title });
    if (QtdDocuments != 0) {
      return res.sendStatus(409);
    }

    const dateSurvey = new Date(SurveyDocument.expireAt);

    if (dateSurvey < dateNow) {
      return res.sendStatus(403);
    }

    await db.collection("choice").insertOne({ title: title, pollId: pollId });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getChoice(req, res) {
  const { id } = req.params;
  try {
    const mongoObjectId = mongoose.Types.ObjectId(String(id));
    const surveyDocument = await db.collection("survey").findOne({
      _id: mongoObjectId,
    });

    const choiceDocument = await db.collection("choice").find().toArray();

    if (!surveyDocument) {
      return res.sendStatus(404);
    }
    return res.send(choiceDocument);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}