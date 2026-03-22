import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import Tasks from './Tasks'

function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('login')

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setPage('login')
  }

  if (user) return <Tasks user={user} onLogout={handleLogout} />
  if (page === 'login') return <Login onLogin={handleLogin} switchToSignup={() => setPage('signup')} />
  if (page === 'signup') return <Signup onLogin={handleLogin} switchToLogin={() => setPage('login')} />
}

export default App