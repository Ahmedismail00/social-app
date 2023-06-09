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
exports.deletePostHandler = exports.getPostHandler = exports.createPostHandler = exports.listPostsHandler = void 0;
const datastore_1 = require("../datastore");
const listPostsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ posts: yield datastore_1.db.listPosts() });
});
exports.listPostsHandler = listPostsHandler;
const createPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title || !req.body.url) {
        return res.sendStatus(400);
    }
    const post = {
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId,
    };
    yield datastore_1.db.createPost(post);
    res.sendStatus(200);
});
exports.createPostHandler = createPostHandler;
const getPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.postId) {
        return res.sendStatus(400);
    }
    const post = yield datastore_1.db.getPost(req.query.postId);
    res.send({ post });
});
exports.getPostHandler = getPostHandler;
const deletePostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.id) {
        return res.sendStatus(400);
    }
    const postId = req.body.id;
    const deleteResponese = yield datastore_1.db.deletePost(postId);
    res.sendStatus(200);
});
exports.deletePostHandler = deletePostHandler;
