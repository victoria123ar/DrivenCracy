import joi from 'joi';

export const surveyArray = joi.object({
    title: joi.string().min(3),
    expiredAt: joi.string(),
  });