import { AggregatePaginateModel, PipelineStage, AggregatePaginateResult } from "mongoose";
import { ITodoRepository } from "../interface/todo.repo.interface";
import type { Itodolist } from "../model/todo.model"
import TodoListModel from "../model/todo.model"
import { ITodo, ITodoList } from "../todo/todo.dto";
import { IPagination } from "../common/dto.common";


class TodoListRepo implements ITodoRepository {
    private todoListModel: AggregatePaginateModel<Itodolist>;

    constructor(todoListModel: AggregatePaginateModel<Itodolist>) {
        this.todoListModel = todoListModel
    }

    createNewTodo(todo: Partial<Itodolist>): Promise<Itodolist> {
        return this.todoListModel.create(todo)
    }

    getTodoList(query:IPagination): Promise<AggregatePaginateResult<Itodolist>> {
        const aggregatePipeline: PipelineStage[] = [];
        aggregatePipeline.push({
           $match: {
    text: { $regex: query.search?.toString() || "", $options: "i" }
  }
        });
        // You may want to add pagination options as needed
        const aggq = this.todoListModel.aggregate(aggregatePipeline)
        return this.todoListModel.aggregatePaginate(aggq, {
           limit: Number.parseInt(query.limit, 10),
            page: Number.parseInt(query.page, 10)
        }
        );
    }

    getTodoById(id: string): Promise<Itodolist | null> {
        return this.todoListModel.findById(id).exec();
    }
updateTodo(taskid: string, updateData: Partial<Itodolist>): Promise<Itodolist | null> {
        return this.todoListModel.findByIdAndUpdate({_id : taskid},{
            $set:{
                text : updateData.text,
                done : updateData.done
            }
        });
    }
   async deleteTodo(id:string):Promise<{ messsage: string; status: boolean; }> {
        await this.todoListModel.findByIdAndDelete(id);
        return {
            messsage: "Todo deleted successfully",
            status: true
        }
    }
}

export const todolistmodel = new TodoListRepo(TodoListModel)