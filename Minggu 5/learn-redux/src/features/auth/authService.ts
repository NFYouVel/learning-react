import { loginRequest } from '../../services/api'

export interface LoginPayload {
  email: string
  password: string
}

export interface UserProfile {
  id: string,
  email: string,
  name: string,
  role: string
}


export function loginAPI (data: LoginPayload) {
  return loginRequest(data.email, data.password)
}
