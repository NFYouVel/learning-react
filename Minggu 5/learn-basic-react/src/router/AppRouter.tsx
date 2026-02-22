import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { setUserInfo } from "../store/authSlice"
import PostDetails from "../pages/PostDetails"
import Home from "../pages/PostList"
import Login from "../pages/Login"

export default function AppRouter() {
  const { userInfo, isLoading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    if (token && !userInfo) {
      // sementara dummy dulu
      dispatch(
        setUserInfo({
          id: "1",
          name: "User",
          email: "dummy@mail.com",
          role: ""
        })
      )
    }
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <Routes>
      {!userInfo && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {userInfo && (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      )}
    </Routes>
  )
}
