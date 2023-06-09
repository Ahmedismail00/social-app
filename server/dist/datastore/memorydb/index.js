"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDataStore = void 0;
const auth_1 = require("../../auth");
class InMemoryDataStore {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.likes = [];
    }
    createUser(user) {
        user.id = crypto.randomUUID();
        const jwt = (0, auth_1.signJwt)({ userId: user.id });
        this.users.push(user);
        return Promise.resolve(jwt);
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
exports.InMemoryDataStore = InMemoryDataStore;
