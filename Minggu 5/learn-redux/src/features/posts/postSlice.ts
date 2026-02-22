import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { getPostsRequest } from '../../services/api'

interface Post {
  id: string
  title: string
  content: string
}

interface PostsState {
  data: Post[]     // HARUS array, biar .map aman
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  data: [],       // <-- penting
  loading: false,
  error: null
}

// async thunk
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await getPostsRequest()
  console.log('Thunk payload:', response.records)
  return response.records  // ambil array langsung dari object
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false
        state.error = 'Failed to fetch posts'
      })
  }
})

export default postsSlice.reducer
