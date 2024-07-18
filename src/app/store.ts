import { configureStore } from '@reduxjs/toolkit'
import auth from '../features/auth/authSlice'
import activity from '../features/activities/activitySlice'
import resident from '../features/residents/residentSlice'
import session from '../features/sessions/sessionSlice'

export const store = configureStore({
  reducer: {
    auth,
    activity,
    resident,
    session,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;