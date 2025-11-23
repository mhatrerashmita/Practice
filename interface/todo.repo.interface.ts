
import mongoose, {AggregatePaginateResult} from "mongoose"
import {Itodolist} from "../model/todo.model"
import {ITodoList} from "../todo/todo.dto"
import { IPagination } from "../common/dto.common";

interface ITodoRepository{
    createNewTodo(todo : Partial<Itodolist>): Promise<Itodolist>

   getTodoList(query: IPagination): Promise<AggregatePaginateResult<Itodolist>>;
}

export {ITodoRepository}