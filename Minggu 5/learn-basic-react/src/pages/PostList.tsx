import { useEffect, useState } from "react"
import { getPostsRequest } from "../utils/api"

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router";
type Post = {
  id: string
  title: string
  content: string
  user: {
    name: string
  }
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  
  useEffect(() => {
    getPostsRequest().then((res) => {
      setPosts(res.records)
    })
  }, [])

  return (
    <div className="post-container">
      {posts.map((post) => (
        <Card sx={{ maxWidth: "100%", marginBottom: 2, bgcolor: 'grey.200' }} key={post.id}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {post.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={'/post-details/' + post.id}>
              <Button size="small">View Details</Button>
            </Link>
            <Button size="small">Delete</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
