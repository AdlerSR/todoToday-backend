import path from 'path';
import uploadConfig from '../config/upload';

interface Request {
  avatarFilename: string;
}

interface Return {
  key: string;
  path: string;
}

class CreateUserAvatar {
  public async execute({ avatarFilename }: Request): Promise<Return | null> {
    if (!avatarFilename) {
      return null;
    }

    const userAvatarFilePath = path.join(
      uploadConfig.directory,
      avatarFilename,
    );

    return { key: avatarFilename, path: userAvatarFilePath };
  }
}

export default CreateUserAvatar;
