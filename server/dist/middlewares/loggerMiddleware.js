"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggerMiddleware = void 0;
const requestLoggerMiddleware = (req, res, next) => {
    console.log('New Request', req.path, '- body:', req.body);
    next();
};
exports.requestLoggerMiddleware = requestLoggerMiddleware;
