const { Router } = require("express");
const mongoose = require('mongoose')

const Todo = require("../models/Todo");
const User = require("../models/User")

const router = Router();
router.get("/", async (req, res) => {
  try {
    
    const todoList = await Todo.find().populate("user", "name");
    
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  
  console.log(req.body)
  try {
    const userId= req.user.id
    const createTodo = {...req.body, user:userId}
    const newTodo = await Todo.create(createTodo);
    console.log(createTodo)
    await User.findByIdAndUpdate(userId, {$push: {todos: newTodo._id}})
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const payload = req.body;
  try {
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id, user: userId }, payload, {
      new: true,
    });
    if(!updatedTodo) {
      throw new Error('Cannot update todo from another user')
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const deleteTodo = await Todo.findById(id);
    console.log(deleteTodo)
    if(deleteTodo.user.toString() !== userId){
      throw new Error('cannot delete another user todo')
    }
    deleteTodo.delete()
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
