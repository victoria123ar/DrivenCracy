import joi from 'joi';

export const optionVoteArray = joi.object({
    title: joi.string().min(3),
    pollId: joi.string(),
  });