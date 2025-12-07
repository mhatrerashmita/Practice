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
exports.deleteTodo = exports.updatetodo = exports.getTodoList = exports.createNewTodo = void 0;
const todo_repository_1 = require("../repository/todo.repository");
const http_status_codes_1 = require("http-status-codes");
const chrono = __importStar(require("chrono-node"));
const createNewTodo = async (data) => {
    // create repo instance
    const text = data.text;
    const parsedDate = chrono.parseDate(data.text) ?? undefined;
    console.log('Parsed Date:', parsedDate);
    await todo_repository_1.todolistmodel.createNewTodo({
        ...data,
        reminded: false,
        reminderAt: parsedDate,
    });
    return {
        message: "Todo added successfully",
        status: true,
    };
};
exports.createNewTodo = createNewTodo;
const getTodoList = async (query) => {
    const data = await todo_repository_1.todolistmodel.getTodoList(query);
    return {
        status: true,
        data: data,
        statusCode: http_status_codes_1.StatusCodes.OK
    };
};
exports.getTodoList = getTodoList;
const updatetodo = async (data, todoid) => {
    // Prepare data to update
    const tododata = {
        text: data.text,
        done: data.done,
        isimportant: data.isimportant,
    };
    // Find the todo by ID
    const findtodo = await todo_repository_1.todolistmodel.getTodoById(todoid);
    if (!findtodo) {
        return {
            message: "Todo not found",
            status: false,
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
        };
    }
    // Update the todo
    await todo_repository_1.todolistmodel.updateTodo(todoid, tododata);
    return {
        message: "Todo updated successfully",
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
    };
};
exports.updatetodo = updatetodo;
exports.default = updatetodo;
const deleteTodo = async (todoid) => {
    const findtodo = await todo_repository_1.todolistmodel.getTodoById(todoid);
    if (!findtodo) {
        return {
            message: "Todo not found",
            status: false,
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
        };
    }
    await todo_repository_1.todolistmodel.deleteTodo(todoid);
    return {
        message: "Todo deleted successfully",
        status: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
    };
};
exports.deleteTodo = deleteTodo;
