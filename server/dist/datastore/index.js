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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.db = void 0;
const memorydb_1 = require("./memorydb");
// Initialization
function initDb(dbPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // db = await new SqlDataStore().openDb(dbPath);
        exports.db = yield new memorydb_1.InMemoryDataStore();
    });
}
exports.initDb = initDb;
