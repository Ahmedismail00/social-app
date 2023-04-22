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
const postHandler_1 = require("./handlers/postHandler");
const datastore_1 = require("./datastore");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, datastore_1.initDb)('datastore/sql/codersquare.sqlite');
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
}));
