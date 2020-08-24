import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const nameHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${nameHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
