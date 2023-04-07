"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const postHandler_1 = require("./handlers/postHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const requestLoggerMiddleware = (req, res, next) => {
    console.log('New Request', req.path, '- body:', req.body);
    next();
};
app.use(requestLoggerMiddleware);
app.get('/posts', (0, express_async_handler_1.default)(postHandler_1.listPostsHandler));
app.get('/post', (0, express_async_handler_1.default)(postHandler_1.getPostHandler));
app.post('/post', (0, express_async_handler_1.default)(postHandler_1.createPostHandler));
app.post('/delete-post', (0, express_async_handler_1.default)(postHandler_1.deletePostHandler));
const errHandler = (err, req, res, next) => {
    console.error('Uncaught exception: ', err);
    return res.status(500).send('Ops, an unexpected error ocured, please try again!');
};
app.use(errHandler);
app.listen(3000);
