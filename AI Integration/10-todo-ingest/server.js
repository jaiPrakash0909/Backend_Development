import express from "express";

import { todos, creatTodo } from "./store.js";

const app = express();
app.use(express.json());

app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const todo = creatTodo(title);
    res.status(201).json(todo);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
