import db from "../db/db.js";
import {surveyArray} from "../services/surveySchema.js"
import dateFormat from "dateformat";

export async function postPoll (req, res) {
  const { title } = req.body;
  const { expireAt } = req.body;
  const { error } = surveyArray.validate(
    { title },
    { abortEarly: false }
  );
  
  try {
    // Title não pode ser uma string vazia, retornar status 422.
    if(!title)
    {
      return res.sendStatus(422);
    }

    //Se expireAt for vazio deve ser considerado 30 dias de enquete por padrão.
    if(!expireAt)
    {
      var date = new Date();
      expireAt = dateFormat(date.setDate(date.getDate() + 30), "yyyy-mm-dd HH:MM")
    }

    await db.collection("survey").insertOne({ title: title, expireAt: expireAt });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export async function getPoll (req, res) {
      try {
      const survey = await db.collection("survey").find().toArray();
  
      res.send(survey);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };