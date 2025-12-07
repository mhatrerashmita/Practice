"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
// Schema definition
const todoSchema = new mongoose_1.Schema({
    text: { type: mongoose_1.Schema.Types.String, required: true },
    done: {
        type: Boolean, // REQUIRED
        default: false,
        required: true
    },
    isimportant: {
        type: Boolean, // REQUIRED
        default: false,
        required: false
    },
    reminded: {
        type: Boolean, // REQUIRED
        default: false,
    },
    reminderAt: { type: mongoose_1.Schema.Types.Date },
    createdAt: { type: mongoose_1.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose_1.Schema.Types.Date, default: Date.now },
}, { timestamps: true } // optional: adds createdAt and updatedAt
);
// Add plugin
todoSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
// Create and export model
const TodoListModel = (0, mongoose_1.model)("todo-list", todoSchema);
exports.default = TodoListModel;
