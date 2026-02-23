const BASE_URL = '/api'

export interface LoginResponse {
    accessToken: string
    refreshToken: string
}

export async function loginRequest(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }

    return response.json()
}

export async function getPostsRequest() {
    const response = await fetch(`${BASE_URL}/post`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    })

    if (!response.ok) {
        throw new Error('Get posts failed')
    }

    const data = await response.json()
    console.log('API posts response:', data) // <--- liat ini
    return data
}

export async function getPostDetails(postID: string) {
    const response = await fetch(`${BASE_URL}/post/${postID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error('Get post details failed')
    }

    return response.json()
}

export async function fetchProfile(token: string) {
  const response = await fetch('/api/auth/me', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error('Failed to fetch profile')

  const data = await response.json()
  return data.user
}
