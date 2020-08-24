"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var path_1 = __importDefault(require("path"));
var tmpFolder = path_1["default"].resolve(__dirname, '..', '..', 'tmp');
exports["default"] = {
    directory: tmpFolder,
    storage: multer_1["default"].diskStorage({
        destination: tmpFolder,
        filename: function (req, file, callback) {
            var nameHash = crypto_1["default"].randomBytes(10).toString('HEX');
            var filename = nameHash + "-" + file.originalname;
            return callback(null, filename);
        }
    })
};
