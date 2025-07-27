import { configureStore } from '@reduxjs/toolkit'
import  coordinatesSlice  from './slices/CoordinatesSlice'
import  searchSlice  from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    coordinatesSlice:coordinatesSlice,
    searchSlice:searchSlice
  },
})