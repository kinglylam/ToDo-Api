import { Schema, model, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: string;
}

const TodoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  user: { type: String, required: true },
});

export const Todo = model<ITodo>("Todo", TodoSchema);
