"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const todo_controller_1 = require("./todo.controller");
const todoRoutes = (0, express_1.Router)();
todoRoutes
    .post("/", todo_controller_1.createNewTodo)
    .get("/", todo_controller_1.getTodoList)
    .patch("/:todoid", todo_controller_1.UpdateTodoList)
    .delete("/:todoid", todo_controller_1.deleteTodoList);
const routes = [
    [
        'todos',
        {
            handler: todoRoutes,
        }
    ]
];
exports.routes = routes;
