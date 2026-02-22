import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserInfo } from '../Types'



export type AuthSlice = {
    userInfo?: UserInfo
    isLoading: boolean
}

const initialState: AuthSlice = {
    userInfo: undefined,
    isLoading: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
            state.userInfo = action.payload
        }
    }
})
export const { setUserInfo } = authSlice.actions
export const authReducer = authSlice.reducer
export const authActions = authSlice.actions;

