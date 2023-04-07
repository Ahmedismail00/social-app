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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByEmailHandler = exports.GetUserByUsernameHandler = exports.createUserHandler = void 0;
const datastore_1 = require("../datastore");
const crypto_1 = __importDefault(require("crypto"));
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.userName || !req.body.email || !req.body.password) {
        return res.sendStatus(400);
    }
    const user = {
        id: crypto_1.default.randomUUID(),
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    };
    yield datastore_1.db.createUser(user);
    res.sendStatus(200);
});
exports.createUserHandler = createUserHandler;
const GetUserByUsernameHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.id) {
        return res.sendStatus(400);
    }
    yield datastore_1.db.getUserByUsername(req.query.id);
    res.sendStatus(200);
});
exports.GetUserByUsernameHandler = GetUserByUsernameHandler;
const GetUserByEmailHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.email) {
        return res.sendStatus(400);
    }
    yield datastore_1.db.getUserByEmail(req.query.email);
    res.sendStatus(200);
});
exports.GetUserByEmailHandler = GetUserByEmailHandler;
