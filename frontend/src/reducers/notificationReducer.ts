import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import { NotificationStatus, NotificationType } from '../types'

const initialState: NotificationType = {
  title: undefined,
  message: undefined,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        title?: string
        message?: string | string[]
        status?: NotificationStatus
        symbol?: boolean
        border?: boolean
        closable?: boolean
      }>
    ) => {
      state.title = action.payload.title
      state.message = action.payload.message
      state.status = action.payload.status ?? 'default'
      state.symbol = action.payload.symbol ?? true
      state.border = action.payload.border ?? false
      state.closable = action.payload.closable ?? false
    },
    clearNotification: (state) => {
      state.title = undefined
      state.message = undefined
    },
  },
})

export const { showNotification, clearNotification } = notificationSlice.actions

let timeoutId: NodeJS.Timeout | null = null

export const notifyWithTimeout = (
  notification: {
    title?: string
    message?: string | string[]
    status?: NotificationStatus
    symbol?: boolean
    border?: boolean
    closable?: boolean
  },
  timeInSeconds = 10
) => {
  return (dispatch: AppDispatch) => {
    // Clear any previous timeout if it exists
    if (timeoutId) {
      return
      /*
      Uncomment this if notifications should override eachother
      clearTimeout(timeoutId)
      timeoutId = null
      */
    }

    // Dispatch the notification
    dispatch(showNotification(notification))

    // Set a new timeout to clear the notification
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null // Reset timeout ID after clearing
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
