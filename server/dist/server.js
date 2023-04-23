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
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const postHandler_1 = require("./handlers/postHandler");
const authHandler_1 = require("./handlers/authHandler");
const userHandler_1 = require("./handlers/userHandler");
const datastore_1 = require("./datastore");
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, datastore_1.initDb)();
    dotenv_1.default.config();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(loggerMiddleware_1.requestLoggerMiddleware);
    app.post('/v1/signup', (0, express_async_handler_1.default)(authHandler_1.signUpHandler));
    app.post('/v1/signin', (0, express_async_handler_1.default)(authHandler_1.signInHandler));
    app.use(authMiddleware_1.authMiddleware);
    app.get('/v1/posts', (0, express_async_handler_1.default)(postHandler_1.listPostsHandler));
    app.get('/v1/post', (0, express_async_handler_1.default)(postHandler_1.getPostHandler));
    app.post('/v1/post', (0, express_async_handler_1.default)(postHandler_1.createPostHandler));
    app.post('/v1/delete-post', (0, express_async_handler_1.default)(postHandler_1.deletePostHandler));
    app.get('/v1/users', (0, express_async_handler_1.default)(userHandler_1.listUsersHandler));
    app.use(errorMiddleware_1.errHandler);
    app.listen(3000);
}))();
