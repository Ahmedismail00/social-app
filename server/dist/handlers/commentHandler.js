"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentHandler = exports.createCommentHandler = exports.listCommentsHandler = void 0;
const datastore_1 = require("../datastore");
const crypto_1 = __importDefault(require("crypto"));
const listCommentsHandler = (req, res) => {
    if (!req.body.postId) {
        return res.sendStatus(400);
    }
    const postId = req.body.postId;
    res.send({ comments: datastore_1.db.listComments(postId) });
};
exports.listCommentsHandler = listCommentsHandler;
const createCommentHandler = (req, res) => {
    if (!req.body.postId || !req.body.comment || !req.body.userId) {
        return res.sendStatus(400);
    }
    const comment = {
        id: crypto_1.default.randomUUID(),
        comment: req.body.comment,
        postId: crypto_1.default.randomUUID(),
        userId: req.body.userId,
        postedAt: Date.now(),
    };
    datastore_1.db.createComment(comment);
    res.sendStatus(200);
};
exports.createCommentHandler = createCommentHandler;
const deleteCommentHandler = (req, res) => {
    if (!req.body.id) {
        return res.sendStatus(400);
    }
    const id = req.body.id;
    const deleteResponese = datastore_1.db.deleteComment(id);
    res.send(' done');
};
exports.deleteCommentHandler = deleteCommentHandler;
