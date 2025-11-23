import { AggregatePaginateModel, Document, Schema, model } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

// Interface for Todo item
interface Itodolist extends Document {
  text: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const todoSchema = new Schema<Itodolist>(
  {
    text: { type: Schema.Types.String, required: true },
    done: {
      type: Boolean,       // REQUIRED
      default: false,
      required: true
    },

    createdAt: { type: Schema.Types.Date, default: Date.now },
    updatedAt: { type: Schema.Types.Date, default: Date.now },
  },
  { timestamps: true } // optional: adds createdAt and updatedAt
);

// Add plugin
todoSchema.plugin(aggregatePaginate);

// Create and export model
const TodoListModel = model<Itodolist, AggregatePaginateModel<Itodolist>>(
  "todo-list",
  todoSchema
);

export default TodoListModel;
export type { Itodolist };
