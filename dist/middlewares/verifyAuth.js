"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
function verifyAuth(req, res, next) {
    var jwtToken = req.headers.authorization;
    if (!jwtToken) {
        throw new Error('Token JWT is missing');
    }
    var _a = jwtToken.split(' '), token = _a[1];
    try {
        var tokenVerify = jsonwebtoken_1.verify(token, 'b78bc8e4d5c6f95eb478835e5fd0097e');
        var sub = tokenVerify.sub;
        req.user = {
            id: sub
        };
        return next();
    }
    catch (_b) {
        throw new Error('Invalid token JWT');
    }
}
exports["default"] = verifyAuth;
