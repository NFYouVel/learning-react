import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginAPI } from './authService'
import { fetchProfile } from '../../services/api'

import type { LoginPayload, UserProfile } from './authService'
import type { LoginResponse } from '../../services/api'

interface AuthState {
  accessToken: string | null
  user: UserProfile | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
}

// login thunk
export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/login',
  async (data) => loginAPI(data)
)

// load profile thunk
export const loadProfile = createAsyncThunk<UserProfile, void, { state: { auth: AuthState } }>(
  'auth/loadProfile',
  async (_, { getState }) => {
    const token = getState().auth.accessToken
    if (!token) throw new Error('No token found')
    return await fetchProfile(token)
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => { state.loading = true; state.error = null })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.accessToken = action.payload.accessToken })
      .addCase(login.rejected, (state) => { state.loading = false; state.error = 'Login gagal' })
      // load profile
      .addCase(loadProfile.pending, (state) => { state.loading = true })
      .addCase(loadProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(loadProfile.rejected, (state) => { state.loading = false })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
