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
exports.MysqlDataStore = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const auth_1 = require("../../auth");
class MysqlDataStore {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.likes = [];
    }
    openDb() {
        return __awaiter(this, void 0, void 0, function* () {
            // const mysql = require('mysql');
            this.db = mysql2_1.default.createConnection({
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE
            });
            this.db.connect((err) => {
                if (err)
                    throw err;
                console.log('Connected to MySQL Server!');
            });
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.id = crypto.randomUUID();
            const jwt = yield (0, auth_1.signJwt)({ userId: user.id });
            this.users.push(user);
            return Promise.resolve(jwt);
        });
    }
    ;
    getUserByEmail(email) {
        return Promise.resolve(this.users.find(u => u.email === email));
    }
    getUserById(id) {
        return Promise.resolve(this.users.find(u => u.id === id));
    }
    getUserByUsername(username) {
        return Promise.resolve(this.users.find(u => u.username === username));
    }
    listUsers() {
        return Promise.resolve(this.users);
    }
    listPosts() {
        // return this.db.query<IPost[]>('SELECT * FROM posts')
        return this.db.query("SELECT * FROM posts");
        // return this.db.query<IPost[]>("SELECT * FROM posts", (err, res) => {
        //     if (err) reject(err)
        //     else resolve(res)
        //   })
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.db.query('INSERT INTO posts () VALUES (id,title,url,postedAt,userId)',post.id,post.title,post.url,post.postedAt,post.userId)
            return console.log('dddd');
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
exports.MysqlDataStore = MysqlDataStore;
