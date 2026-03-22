import { useState } from 'react'

function Signup({ onLogin, switchToLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
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
      <h2>Sign Up</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
      <button onClick={handleSignup} style={{ padding: '8px 16px' }}>Sign Up</button>
      <p>Already have an account? <span onClick={switchToLogin} style={{ color: 'blue', cursor: 'pointer' }}>Login</span></p>
    </div>
  )
}

export default Signup