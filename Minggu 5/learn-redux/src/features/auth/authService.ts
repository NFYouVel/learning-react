import { loginRequest } from '../../services/api'
import type { LoginResponse } from '../../services/api'

export interface LoginPayload {
  email: string
  password: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
}

export const loginAPI = (data: LoginPayload): Promise<LoginResponse> => {
  return loginRequest(data.email, data.password)
}

export async function fetchProfile(token: string): Promise<UserProfile> {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error('Failed to fetch profile')

  const data = await response.json()
  return data.user
}
