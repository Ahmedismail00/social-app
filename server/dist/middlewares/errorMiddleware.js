"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = void 0;
const errHandler = (err, req, res, next) => {
    console.error('Uncaught exception: ', err);
    // return res.status(500).send('Ops, an unexpected error ocured, please try again!')
};
exports.errHandler = errHandler;
