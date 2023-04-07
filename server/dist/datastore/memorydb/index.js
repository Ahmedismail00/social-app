"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatastore = void 0;
class InMemoryDatastore {
    constructor() {
        this.users = [];
        this.posts = [];
        this.comments = [];
        this.likes = [];
    }
    createUser(user) {
        this.users.push(user);
    }
    ;
    getUserByEmail(email) {
        return this.users.find(u => u.email === email);
    }
    getUserByUsername(userName) {
        return this.users.find(u => u.userName === userName);
    }
    listPosts() {
        return this.posts;
    }
    createPost(post) {
        this.posts.push(post);
    }
    getPost(id) {
        return this.posts.find(p => p.id === id);
    }
    deletePost(id) {
        const index = this.posts.findIndex(p => p.id === id);
        if (index === -1) {
            return;
        }
        this.posts.splice(index, 1);
    }
    createLike(like) {
        this.likes.push(like);
    }
    listComments(postId) {
        return this.comments;
    }
    createComment(comment) {
        this.comments.push(comment);
    }
    deleteComment(id) {
        const index = this.comments.findIndex(c => c.id === id);
        if (index === -1) {
            return;
        }
        this.comments.splice(index, 11);
    }
}
exports.InMemoryDatastore = InMemoryDatastore;
