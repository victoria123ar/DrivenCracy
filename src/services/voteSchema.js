import joi from 'joi';

export const voteArray = joi.object({ createdAt: joi.string(), choiceId: joi.string(),});