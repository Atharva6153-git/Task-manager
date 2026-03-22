import { useState } from 'react'

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      onLogin(data.user)
    } else {
      alert(data.message)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', fontFamily: 'Arial' }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
      <button onClick={handleLogin} style={{ padding: '8px 16px' }}>Login</button>
      <p>Don't have an account? <span onClick={switchToSignup} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</span></p>
    </div>
  )
}

export default Login