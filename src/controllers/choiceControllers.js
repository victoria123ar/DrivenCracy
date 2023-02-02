import db from "../db/db.js";
import { optionVoteArray } from "../services/optionVoteSchema.js";

export async function postChoice (req, res){
    const { title } = req.body;
    const { pollId } = req.body;
    const { error } = optionVoteArray.validate(
      { title },
      { abortEarly: false }
    );
    const date = res.locals.expireAt;

    try {
      // Uma opção de voto não pode ser inserida sem uma enquete existente, retornar status 404.
      const existSurvey = await db.collection("survey").findOne({
        title,
      });
      if (existSurvey) {
        return res.sendStatus(404);
      }
      // Title não pode ser uma string vazia, retornar status 422.
      if(!title)
      {
        return res.sendStatus(422);
      }
  
      //Title não pode ser repetido, retornar status 409.
      if(title === title)
      {
        return res.sendStatus(409);
      }

      //Se a enquete já estiver expirado deve retornar erro com status 403.

    } catch () {
      
    }
}