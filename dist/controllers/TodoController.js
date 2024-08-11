"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const Todo_1 = require("../models/Todo");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    try {
        const todo = new Todo_1.Todo({
            title,
            description,
            user: req.user,
        });
        yield todo.save();
        res.json(todo);
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield Todo_1.Todo.find({ user: req.user });
        res.json(todos);
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.getTodos = getTodos;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        let todo = yield Todo_1.Todo.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        if (todo.user !== req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        todo = yield Todo_1.Todo.findByIdAndUpdate(id, { $set: { title, description, completed } }, { new: true });
        res.json(todo);
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield Todo_1.Todo.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        if (todo.user !== req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        yield todo.deleteOne();
        res.json({ message: "Todo removed" });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.deleteTodo = deleteTodo;
