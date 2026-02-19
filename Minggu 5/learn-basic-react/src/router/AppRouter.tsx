import { Routes, Route } from 'react-router'
import Login from '../pages/Login'
import Home from '../pages/PostList'
import PostDetails from '../pages/PostDetails'
import LoginSuccess from '../pages/LoginSuccess'
import { useAppSelector } from '../hooks/useAppSelector'

export default function AppRouter() {
  const { isLoading, userInfo } = useAppSelector(state => state.auth)

  // if (isLoading || !userInfo) {
  //   return null
  // }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post-details/:id" element={<PostDetails />} />
      {!userInfo && <Route path="/login-success" element={<LoginSuccess />} />}
    </Routes>
  )
}
