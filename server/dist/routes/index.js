"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const middlewares_1 = require("../middlewares");
const handlers_1 = require("../handlers");
const router = (0, express_1.Router)();
router.get('/healthz', (req, res) => {
    res.send({ status: "ok" });
});
router.post('/v1/signup', (0, express_async_handler_1.default)(handlers_1.signUpHandler));
router.post('/v1/signin', (0, express_async_handler_1.default)(handlers_1.signInHandler));
router.use(middlewares_1.authMiddleware);
// private routes
router.get('/v1/users', (0, express_async_handler_1.default)(handlers_1.listUsersHandler));
router.get('/v1/posts', (0, express_async_handler_1.default)(handlers_1.listPostsHandler));
router.get('/v1/post', (0, express_async_handler_1.default)(handlers_1.getPostHandler));
router.post('/v1/post', (0, express_async_handler_1.default)(handlers_1.createPostHandler));
router.post('/v1/delete-post', (0, express_async_handler_1.default)(handlers_1.deletePostHandler));
router.post('/v1/comment', (0, express_async_handler_1.default)(handlers_1.createCommentHandler));
exports.default = router;
