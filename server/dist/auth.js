"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(payload) {
    return jsonwebtoken_1.default.sign(payload, getJwtSecret(), {
        expiresIn: '15d'
    });
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    return jsonwebtoken_1.default.verify(token, getJwtSecret());
}
exports.verifyJwt = verifyJwt;
function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('Missing JWT secret');
        process.exit(1);
    }
    return secret;
}
