import { celebrate, Segments, Joi } from 'celebrate';

class ValidatorUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: any;

  constructor() {
    this.create = celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string()
          .required()
          .min(6)
          .error(new Error('Name is required')),
        avatar: Joi.string(),
      }),
    });
  }
}

export default new ValidatorUser();
