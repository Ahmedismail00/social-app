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
exports.SqlDataStore = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
class SqlDataStore {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.likes = [];
    }
    openDb(dbPath) {
        return __awaiter(this, void 0, void 0, function* () {
            // open the database
            this.db = yield (0, sqlite_1.open)({
                filename: dbPath,
                driver: sqlite3_1.default.Database,
                mode: sqlite3_1.default.OPEN_READWRITE,
            });
            this.db.run('PRAGMA foreign_keys = ON;');
            yield this.db.migrate({
                migrationsPath: path_1.default.join(__dirname, 'migrations'),
            });
            return this;
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(`INSERT INTO users (id,email,password,username) VALUES (?,?,?,?)`, user.id, user.email, user.password, user.userName);
        });
    }
    getUserByEmail(email) {
        return this.db.get(`SELECT * FROM users WHERE users.email = ?`, email);
    }
    getUserByUsername(userName) {
        return this.db.get(`SELECT * FROM users WHERE users.username = ?`, userName);
    }
    listPosts() {
        return this.db.all('SELECT * FROM posts');
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run('INSERT INTO posts () VALUES (id,title,url,postedAt,userId)', post.id, post.title, post.url, post.postedAt, post.userId);
        });
    }
    getPost(id) {
        return Promise.resolve(this.posts.find(p => p.id === id));
    }
    deletePost(id) {
        const index = this.posts.findIndex(p => p.id === id);
        if (index === -1) {
            return Promise.resolve();
        }
        this.posts.splice(index, 1);
        return Promise.resolve();
    }
    createLike(like) {
        this.likes.push(like);
        return Promise.resolve();
    }
    listComments(postId) {
        return Promise.resolve(this.comments);
    }
    createComment(comment) {
        this.comments.push(comment);
        return Promise.resolve();
    }
    deleteComment(id) {
        const index = this.comments.findIndex(c => c.id === id);
        if (index === -1) {
            return Promise.resolve();
        }
        this.comments.splice(index, 11);
        return Promise.resolve();
    }
}
exports.SqlDataStore = SqlDataStore;
