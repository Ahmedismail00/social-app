"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_1 = require("../auth");
const datastore_1 = require("../datastore");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const payload = (0, auth_1.verifyJwt)(token);
        const user = yield datastore_1.db.getUserById(payload.userId);
        if (!user) {
            return res.sendStatus(401);
        }
        res.locals.userId = user.id;
        next();
    }
    catch (error) {
        return res.status(401).send({ error: "Bad token" });
    }
});
exports.authMiddleware = authMiddleware;
