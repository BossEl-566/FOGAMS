// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface User {
    _id: string
    username: string
    email: string
    profilePicture: string
    isMember: boolean
    isAdmin: boolean
    isDeptHead: boolean
    isPastor: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  

interface UserState {
  currentUser: User | null
  error: string | null
  loading: boolean
}

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
      state.error = null
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.currentUser = action.payload
      state.error = null
      AsyncStorage.setItem('currentUser', JSON.stringify(action.payload)) // persist
    },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    updateStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    updateFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    deleteUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    signoutSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = null
      AsyncStorage.removeItem('currentUser') // clear
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions

export const userReducer = userSlice.reducer
