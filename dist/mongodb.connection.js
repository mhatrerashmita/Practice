"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongodb = void 0;
const mongoose = require('mongoose');
const MongoConnection = 'mongodb://localhost:27017/new_books';
const Mongodb = async () => {
    try {
        await mongoose.connect(MongoConnection);
        console.log("connect bahi!!!!!!");
    }
    catch (error) {
        console.log("not connect", error);
        process.exit(1);
    }
};
exports.Mongodb = Mongodb;
