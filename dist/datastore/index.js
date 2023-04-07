"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const memorydb_1 = require("./memorydb");
exports.db = new memorydb_1.InMemoryDatastore();
