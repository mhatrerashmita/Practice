import { Router } from 'express';
import { createNewTodo, getTodoList,UpdateTodoList ,deleteTodoList} from "./todo.controller";

const todoRoutes = Router()

todoRoutes
.post("/" , createNewTodo)
.get("/" , getTodoList)
.patch("/:todoid" , UpdateTodoList)
.delete("/:todoid" , deleteTodoList)

const routes: [string, { handler: Router }][] = [
    [
        'todos',
        {
            handler: todoRoutes,
           
        }
    ]
];

export {routes}