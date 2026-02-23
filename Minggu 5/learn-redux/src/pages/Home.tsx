import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { fetchPosts } from '../features/posts/postSlice'

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data: posts } = useAppSelector(state => state.posts)


  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Post List</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage
