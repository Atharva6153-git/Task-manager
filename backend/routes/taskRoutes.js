const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const auth = require('../middleware/auth')

// GET all tasks for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST create a task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      user: req.user.id
    })
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT mark task complete/incomplete
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    )
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE a task
router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router