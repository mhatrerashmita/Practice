"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodoList = exports.UpdateTodoList = exports.createNewTodo = exports.getTodoList = void 0;
const todoService = __importStar(require("./todo.service"));
const createNewTodo = (req, res, next) => {
    todoService.createNewTodo(req.body)
        .then((details) => {
        res.status(200).json(details);
    })
        .catch((err) => {
        next(err);
    });
};
exports.createNewTodo = createNewTodo;
const getTodoList = (req, res, next) => {
    todoService
        .getTodoList(req.query)
        .then((details) => {
        res.status(details.statusCode).json(details);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getTodoList = getTodoList;
const UpdateTodoList = (req, res, next) => {
    todoService
        .updatetodo(req.body, req.params.todoid)
        .then((details) => {
        res.status(details.statusCode).json(details);
    })
        .catch((err) => {
        next(err);
    });
};
exports.UpdateTodoList = UpdateTodoList;
const deleteTodoList = (req, res, next) => {
    todoService
        .deleteTodo(req.params.todoid)
        .then((details) => {
        res.status(details.statusCode).json(details);
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteTodoList = deleteTodoList;
