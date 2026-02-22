import { useAppSelector } from '../app/store'

function Home() {
  const { user } = useAppSelector(state => state.auth)
  return <h1>Welcome, {user?.name || 'User'}</h1>
}

export default Home
