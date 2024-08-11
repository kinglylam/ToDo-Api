import { Request, Response } from "express";
import { Todo } from "../models/Todo";

interface AuthRequest extends Request {
  user?: string;
}

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;

  try {
    const todo = new Todo({
      title,
      description,
      user: req.user,
    });
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.json(todos);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    let todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.user !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    todo = await Todo.findByIdAndUpdate(
      id,
      { $set: { title, description, completed } },
      { new: true }
    );

    res.json(todo);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.user !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await todo.deleteOne();
    res.json({ message: "Todo removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
