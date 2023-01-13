import { createSlice } from '@reduxjs/toolkit'
import { json } from 'stream/consumers'
import type { RootState } from '../app/store'


interface userState {
    id: number
    first_name: string
    last_name: string
    email: string
    is_chef: boolean
    profile_photo: string
    profile_description: string
    access: string
    refresh: string
}

const initialState: userState = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    is_chef: false,
    profile_photo: '',
    profile_description: '',
    access: '',
    refresh: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.access = action.payload.access
      state.refresh = action.payload.refresh
      localStorage.setItem('access', state.access)
      localStorage.setItem('refresh', state.refresh)
    },
    getDetails: (state, action) => {
      state.id = action.payload.id
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      state.is_chef = action.payload.is_chef
      state.profile_description = action.payload.profile_description
      state.profile_photo = action.payload.profile_photo
      const is_chef = JSON.stringify(state.is_chef)
      const id = JSON.stringify(state.id)
      localStorage.setItem('id', id)
      localStorage.setItem('first_name', state.first_name)
      localStorage.setItem('last_name', state.last_name)
      localStorage.setItem('email', state.email)
      localStorage.setItem('is_chef', is_chef)
      localStorage.setItem('profile_photo', state.profile_photo)
      localStorage.setItem('profile_description', state.profile_description)
    },
    logout: (state) => {
      state.id = 0
      state.email = ''
      state.id = 0
      state.profile_photo = ''
      state.profile_description = ''
      state.first_name = ''
      state.last_name = ''
      state.access = ''
      state.refresh = ''
      localStorage.clear()
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
  }
  }
})

export const { login, getDetails, logout } = userSlice.actions

export const selectId = (state: RootState) => state.user.id
export const selectFirstName = (state: RootState) => state.user.first_name
export const selectLastName = (state: RootState) => state.user.last_name
export const selectEmail = (state: RootState) => state.user.email
export const selectIsCook = (state: RootState) => state.user.is_cook
export const selectProfilePhoto = (state: RootState) => state.user.profile_photo
export const selectProfileDescription = (state: RootState) => state.user.profile_description
export const selectAccess = (state: RootState) => state.user.access
export const selectRefresh = (state: RootState) => state.user.refresh

export default userSlice.reducer