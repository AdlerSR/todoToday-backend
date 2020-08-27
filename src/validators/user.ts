import { celebrate, Segments, Joi } from 'celebrate';

class ValidatorUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: any;

  constructor() {
    this.create = celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().error(new Error('Name is requires')),
        email: Joi.string()
          .required()
          .email()
          .error(new Error('Email is requires')),
        password: Joi.string()
          .required()
          .min(6)
          .error(new Error('Password is requires')),
        avatar: [Joi.string().optional(), Joi.allow(null)],
      }),
    });
  }
}

export default new ValidatorUser();
