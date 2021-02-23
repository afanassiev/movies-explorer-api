const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, patchUser } = require('../controllers/users');

usersRouter.get('/users/me', getUser);
usersRouter.patch('/users/me', celebrate({
  params: Joi.object().keys({
    name: Joi.string().required().hex().length(24),
    email: Joi.string().email()
  }),
}), patchUser);
module.exports = usersRouter;
