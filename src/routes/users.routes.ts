import { Router } from 'express';
import multer from 'multer';
import verifyAuth from '../middlewares/verifyAuth';
import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import UpdateUserAvatar from '../services/UpdateUserAvatar';

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const userService = new CreateUserService();

  const user = await userService.execute({ name, email, password });

  delete user.password;

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
