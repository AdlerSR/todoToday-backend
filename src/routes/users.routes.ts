import { Router } from 'express';
import multer from 'multer';

import verifyAuth from '../middlewares/verifyAuth';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatar from '../services/UpdateUserAvatar';
import ShowUserService from '../services/ShowUserService';

import ValidatorUser from '../validators/user';

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.post('/', ValidatorUser.create, async (req, res) => {
  const { name, email, password } = req.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });

  delete user.password;

  return res.json(user);
});

userRouter.get('/', verifyAuth, async (req, res) => {
  const userService = new ShowUserService();

  const user = await userService.execute({ user_id: req.user.id });

  return res.json(user);
});

userRouter.patch(
  '/avatar',
  verifyAuth,
  upload.single('avatar'),
  async (req, res) => {
    const avatarService = new UpdateUserAvatar();

    const user = await avatarService.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default userRouter;
