import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { loginRequest } from "../utils/api"
import "../styles/auth.css"
import { setUserInfo } from "../store/authSlice"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi")
      return
    }

    try {
      setLoading(true)

      const data = await loginRequest(email, password)

      // simpan token
      localStorage.setItem("access_token", data.accessToken)

      // 🔥 DISPATCH SEKALI, PAKAI YANG DI ATAS
      dispatch(
        setUserInfo({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: "",
        })
      )

      navigate("/home")
    } catch (error) {
      alert("Email atau password salah")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  )
}
