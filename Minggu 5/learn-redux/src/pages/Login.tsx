import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, loadProfile } from '../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../app/store'
import './Login.css'

function Login() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, error } = useAppSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await dispatch(login({ email, password }))
        if (login.fulfilled.match(result)) {
            await dispatch(loadProfile())
            navigate('/home')
        }
    }

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="user@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                {error && <p className="error-text">{error}</p>}
                <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </form>
        </div>
    )
}

export default Login
