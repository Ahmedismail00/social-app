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
exports.createLikeHanlder = void 0;
const datastore_1 = require("../datastore");
const createLikeHanlder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.postId || !req.body.userId) {
        return res.sendStatus(400);
    }
    const like = {
        userId: req.body.userId,
        postId: req.body.postId
    };
    yield datastore_1.db.createLike(like);
    // TODO: catch the error in await promise
    res.sendStatus(200);
});
exports.createLikeHanlder = createLikeHanlder;
