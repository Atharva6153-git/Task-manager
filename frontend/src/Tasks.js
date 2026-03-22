import { useState, useEffect } from 'react'

function Tasks({ user, onLogout }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('/api/tasks', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    const data = await res.json()
    setTasks(data)
  }

  const addTask = async () => {
    if (!title) return
    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title })
    })
    setTitle('')
    fetchTasks()
  }

  const toggleTask = async (id, completed) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ completed: !completed })
    })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    fetchTasks()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    onLogout()
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>My Tasks</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Welcome, {user.name}</p>
      <input
        placeholder="New task..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <button onClick={addTask} style={{ padding: '8px 16px' }}>Add Task</button>
      <hr />
      {tasks.map(task => (
        <div key={task._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid #ccc', marginBottom: '8px' }}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
          <div>
            <button onClick={() => toggleTask(task._id, task.completed)} style={{ marginRight: '8px' }}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tasks