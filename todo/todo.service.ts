import { ITodo, ITodoList } from "./todo.dto";
import {todolistmodel} from "../repository/todo.repository";
import { StatusCodes } from 'http-status-codes';
import { Itodolist } from "../model/todo.model";
import { ICommonAggregateResponse, ICommonMessageResponse } from "../common/responce.common";
import mongoose, { ObjectId } from "mongoose";
import { IPagination } from "../common/dto.common";
import * as chrono from "chrono-node";



const createNewTodo = async (
  data: ITodo
): Promise<{ message: string; status: boolean }> => {
 // create repo instance
 const text = data.text;
  const parsedDate: Date | undefined = chrono.parseDate(data.text) ?? undefined;
console.log('Parsed Date:', parsedDate);

  await todolistmodel.createNewTodo({
    ...data,
     reminded: false,        
    reminderAt: parsedDate,
  });


  return {
    message: "Todo added successfully",
    status: true,
    
  };
};

const getTodoList = async (
  query: IPagination
):Promise<ICommonAggregateResponse<Itodolist>> => {
  const data = await todolistmodel.getTodoList(query)
    return{
      status: true,
      data: data  ,
      statusCode: StatusCodes.OK
    }
  }

const updatetodo = async (
  data: Partial<Itodolist>,
  todoid: string
): Promise<ICommonMessageResponse> => {
  // Prepare data to update
  const tododata: Partial<Itodolist> = {
    text: data.text,
    done: data.done,
    isimportant: data.isimportant,
  };

  // Find the todo by ID
  const findtodo = await todolistmodel.getTodoById(todoid);
  if (!findtodo) {
    return {
      message: "Todo not found",
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
    };
  }

  // Update the todo
  await todolistmodel.updateTodo(todoid, tododata);

  return {
    message: "Todo updated successfully",
    status: true,
    statusCode: StatusCodes.OK,
  };
};

export default updatetodo;

const deleteTodo = async (
  todoid: string
): Promise<ICommonMessageResponse> => {
    const findtodo = await todolistmodel.getTodoById(todoid);
  if (!findtodo) {
    return {
      message: "Todo not found",
      status: false,
      statusCode: StatusCodes.NOT_FOUND,
    };
  }
  await todolistmodel.deleteTodo(todoid);
  return {
    message: "Todo deleted successfully", 
    status: true,
    statusCode: StatusCodes.OK,
  };
}



export  {createNewTodo,getTodoList,updatetodo,deleteTodo};



