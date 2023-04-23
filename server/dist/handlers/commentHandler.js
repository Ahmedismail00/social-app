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
exports.deleteCommentHandler = exports.createCommentHandler = exports.listCommentsHandler = void 0;
const datastore_1 = require("../datastore");
const crypto_1 = __importDefault(require("crypto"));
const listCommentsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.postId) {
        return res.sendStatus(400);
    }
    const postId = req.body.postId;
    res.send({ comments: yield datastore_1.db.listComments(postId) });
});
exports.listCommentsHandler = listCommentsHandler;
const createCommentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.postId || !req.body.comment || !req.body.userId) {
        return res.sendStatus(400);
    }
    const comment = {
        id: crypto_1.default.randomUUID(),
        comment: req.body.comment,
        postId: req.body.postId,
        userId: req.body.userId,
        postedAt: Date.now(),
    };
    yield datastore_1.db.createComment(comment);
    res.sendStatus(200);
});
exports.createCommentHandler = createCommentHandler;
const deleteCommentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id) {
        return res.sendStatus(400);
    }
    const id = req.body.id;
    const deleteResponese = yield datastore_1.db.deleteComment(id);
    res.sendStatus(200);
});
exports.deleteCommentHandler = deleteCommentHandler;
