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
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const postHandler_1 = require("./handlers/postHandler");
const authHandler_1 = require("./handlers/authHandler");
const userHandler_1 = require("./handlers/userHandler");
const commentHandler_1 = require("./handlers/commentHandler");
const datastore_1 = require("./datastore");
const loggerMiddleware_1 = require("./middlewares/loggerMiddleware");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
// initDb()
mongoose_1.default.connect(config_1.default.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    console.log(`Running on ENV = ${process.env.NODE_ENV}`);
    console.log('Connected to mongoDB.');
    startServer();
})
    .catch((error) => {
    console.log('Unable to connect.');
    console.log(error);
    process.exit(1);
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, datastore_1.initDb)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(loggerMiddleware_1.requestLoggerMiddleware);
    // public
    app.get('/healthz', (req, res) => {
        res.send({ status: "ok" });
    });
    app.post('/v1/signup', (0, express_async_handler_1.default)(authHandler_1.signUpHandler));
    app.post('/v1/signin', (0, express_async_handler_1.default)(authHandler_1.signInHandler));
    app.use(authMiddleware_1.authMiddleware);
    app.get('/v1/users', (0, express_async_handler_1.default)(userHandler_1.listUsersHandler));
    app.get('/v1/posts', (0, express_async_handler_1.default)(postHandler_1.listPostsHandler));
    app.get('/v1/post', (0, express_async_handler_1.default)(postHandler_1.getPostHandler));
    app.post('/v1/post', (0, express_async_handler_1.default)(postHandler_1.createPostHandler));
    app.post('/v1/delete-post', (0, express_async_handler_1.default)(postHandler_1.deletePostHandler));
    app.post('/v1/comment', (0, express_async_handler_1.default)(commentHandler_1.createCommentHandler));
    app.use(errorMiddleware_1.errHandler);
    app.listen(process.env.APP_PORT || 3000);
});
