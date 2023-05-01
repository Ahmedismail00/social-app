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
const datastore_1 = require("./datastore");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares");
const routes_1 = __importDefault(require("./routes"));
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
    // init database object
    (0, datastore_1.initDb)();
    const app = (0, express_1.default)();
    // Helmet is used to secure this app by configuring the http-header
    app.use((0, helmet_1.default)());
    // compression is used to compresss res
    app.use((0, compression_1.default)());
    // cors prevents other websites or domains from accessing your web resources directly from the browser.
    app.use((0, cors_1.default)());
    // parse url encoded request body
    app.use(express_1.default.json());
    app.use(middlewares_1.requestLoggerMiddleware);
    // routes
    app.use(routes_1.default);
    app.use(middlewares_1.errHandler);
    app.listen(process.env.APP_PORT || 3000);
});
