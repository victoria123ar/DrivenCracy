import db from "../db/db.js";
import { choiceVoteArray } from "../services/choiceVoteSchema.js"
import mongoose from "mongoose";

export async function postVote(req, res) {
  const { id } = req.params;
  const { error } = choiceVoteArray.validate({ abortEarly: false });
  const dateNow = new Date();
  try {

    const choiceDocument = await db.collection("choice").findOne({
        _id: mongoose.Types.ObjectId(String(id)),
      });

      
    if (!choiceDocument) {
      return res.sendStatus(404);
    }

    const surveyDocument = await db.collection("survey").findOne({
        _id: mongoose.Types.ObjectId(String(choiceDocument.pollId)),
      });
    
    console.log(surveyDocument)
    const dateSurvey = new Date(surveyDocument.expireAt);
    
    if (dateSurvey < dateNow) 
    {
      return res.sendStatus(403);
    }

    await db.collection("vote").insertOne({ createdAt: dateNow, choiceId: id });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}