"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var todos_routes_1 = __importDefault(require("./todos.routes"));
var users_routes_1 = __importDefault(require("./users.routes"));
var sessions_routes_1 = __importDefault(require("./sessions.routes"));
var routes = express_1.Router();
routes.use('/todos', todos_routes_1["default"]);
routes.use('/users', users_routes_1["default"]);
routes.use('/sessions', sessions_routes_1["default"]);
exports["default"] = routes;
