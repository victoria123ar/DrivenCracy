import db from "../db/db.js";
import mongoose from "mongoose";

export async function getResult(req, res){
    const { id } = req.params;
    try {

      const surveyDocument = await db.collection("survey").findOne({
        _id: mongoose.Types.ObjectId(String(id)),
      });

      if(!surveyDocument)
      {
        res.sendStatus(404);
      }

      const choiceDocument = await db.collection("choice").find({
        pollId: String(surveyDocument._id),
      }).toArray();

      let MaiorVoto = 0
      let indice = 0
      let contador = 0

      for await(let element of choiceDocument)
      {
        let voto = await db.collection("vote").countDocuments({ choiceId: String(element._id) });
        
        console.log('voto loop: '+ voto)
        if(voto > MaiorVoto)
        {
          MaiorVoto = voto 
          console.log('maior voto loop: '+ MaiorVoto)
          indice = contador          
        }

        contador++
      }
      
      console.log('Final: ' + contador)
      console.log('O maior voto é: ' + MaiorVoto)
      
      return res.send({_id: id, title: surveyDocument.title, expireAt: surveyDocument.expireAt, result:{title: choiceDocument[indice].title, votes: MaiorVoto}});
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
}