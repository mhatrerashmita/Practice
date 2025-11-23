import { IPagination } from "../common/dto.common";
import { ITodo, ITodoList } from "./todo.dto";
import * as todoService from './todo.service'; 
import { Request, Response, NextFunction } from 'express';

const createNewTodo = (
    req: Request<unknown, unknown, ITodo>,
    res: Response,
    next: NextFunction
): void => {
    todoService.createNewTodo(req.body)
        .then((details) => {
            res.status(200).json(details);
        })
        .catch((err) => {
            next(err);
        });
};

export const getTodoList = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    todoService
        .getTodoList(req.query as unknown as IPagination)
        .then((details) => {
            res.status(details.statusCode).json(details);
        })
        .catch((err) => {
            next(err);
        });
};
 const UpdateTodoList = (
    req: Request<{ todoid: string }>,
    res: Response,
    next: NextFunction
): void => {
    todoService
        .updatetodo(req.body, req.params.todoid)
        .then((details) => {
            res.status(details.statusCode).json(details);
        })
        .catch((err) => {
            next(err);
        });
};
 const deleteTodoList = (
    req: Request<{ todoid: string }>,
    res: Response,
    next: NextFunction
): void => {
    todoService
        .deleteTodo(req.params.todoid)
        .then((details) => {
            res.status(details.statusCode).json(details);
        })
        .catch((err) => {
            next(err);
        });
};

export {
    createNewTodo,
    UpdateTodoList,
    deleteTodoList
   
};