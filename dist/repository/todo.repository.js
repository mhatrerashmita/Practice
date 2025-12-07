"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todolistmodel = void 0;
const todo_model_1 = __importDefault(require("../model/todo.model"));
class TodoListRepo {
    constructor(todoListModel) {
        this.todoListModel = todoListModel;
    }
    createNewTodo(todo) {
        return this.todoListModel.create(todo);
    }
    getTodoList(query) {
        const aggregatePipeline = [];
        aggregatePipeline.push({
            $match: {
                text: { $regex: query.search?.toString() || "", $options: "i" }
            }
        });
        // You may want to add pagination options as needed
        const aggq = this.todoListModel.aggregate(aggregatePipeline);
        return this.todoListModel.aggregatePaginate(aggq, {
            limit: Number.parseInt(query.limit, 10),
            page: Number.parseInt(query.page, 10)
        });
    }
    getTodoById(id) {
        return this.todoListModel.findById(id).exec();
    }
    updateTodo(taskid, updateData) {
        return this.todoListModel.findByIdAndUpdate({ _id: taskid }, {
            $set: {
                text: updateData.text,
                done: updateData.done,
                isimportant: updateData.isimportant
            }
        });
    }
    async deleteTodo(id) {
        await this.todoListModel.findByIdAndDelete(id);
        return {
            messsage: "Todo deleted successfully",
            status: true
        };
    }
}
exports.todolistmodel = new TodoListRepo(todo_model_1.default);
