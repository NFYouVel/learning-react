// import { useEffect } from 'react'
// import type { ReactNode } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAppSelector } from '../app/store'

// interface ProtectedRouteProps { children: ReactNode }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const navigate = useNavigate()
//   const { accessToken } = useAppSelector(state => state.auth)

//   useEffect(() => { if (!accessToken) navigate('/') }, [accessToken, navigate])

//   return <>{children}</>
// }
