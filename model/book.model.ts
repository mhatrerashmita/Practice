import mongoose, { Schema, Document } from "mongoose";
import { IBook } from "../interface/book.interface";
import mongooseaggregatePaginate from 'mongoose-aggregate-paginate-v2'

const Bookschema : Schema = new Schema<IBook>({
   id: { type: String, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  prize: { type: String, required: true },
})

Bookschema.plugin(mongooseaggregatePaginate)
export const Book = mongoose.model<IBook>("Book" , Bookschema)