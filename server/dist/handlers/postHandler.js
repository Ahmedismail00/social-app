"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.getPostHandler = exports.createPostHandler = exports.listPostsHandler = void 0;
const datastore_1 = require("../datastore");
const crypto_1 = __importDefault(require("crypto"));
const listPostsHandler = (req, res) => {
    res.send({ posts: datastore_1.db.listPosts() });
};
exports.listPostsHandler = listPostsHandler;
const createPostHandler = (req, res) => {
    if (!req.body.title || !req.body.url || !req.body.userId) {
        return res.sendStatus(400);
    }
    const post = {
        id: crypto_1.default.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
    };
    datastore_1.db.createPost(post);
    res.sendStatus(200);
};
exports.createPostHandler = createPostHandler;
const getPostHandler = (req, res) => {
    if (!req.query.userId) {
        return res.sendStatus(400);
    }
    const post = datastore_1.db.getPost(req.query.userId);
    res.send({ post: post });
};
exports.getPostHandler = getPostHandler;
const deletePostHandler = (req, res) => {
    if (!req.body.id) {
        return res.sendStatus(400);
    }
    const postId = req.body.id;
    const deleteResponese = datastore_1.db.deletePost(postId);
    console.log(deleteResponese);
    // if(deleteResponese == 0){
    //   res.send('post not found')
    //}
    res.send(' done');
};
exports.deletePostHandler = deletePostHandler;
