import joi from 'joi';

export const choiceVoteArray = joi.object({
    title: joi.string().min(3),
    pollId: joi.string(),
  });