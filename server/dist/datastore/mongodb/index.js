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
exports.MongoDataStore = void 0;
const models_1 = require("../../models");
class MongoDataStore {
    constructor() {
        // private db!:any;
        // public async openDb() {
        //   mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' })
        //   .then(() => {
        //       console.log(`Running on ENV = ${process.env.NODE_ENV}`);
        //       console.log('Connected to mongoDB.');
        //   })
        //   .catch((error) => {
        //       console.log('Unable to connect.');
        //       console.log(error);
        //   });
        // }
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.likes = [];
    }
    createUser(user) {
        this.users.push(user);
        return Promise.resolve();
    }
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
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.User.find();
        });
    }
    listPosts() {
        return Promise.resolve(this.posts);
    }
    createPost(post) {
        this.posts.push(post);
        return Promise.resolve();
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
exports.MongoDataStore = MongoDataStore;
