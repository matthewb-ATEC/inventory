import React from 'react'
// Notification Redux state
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { clearNotification } from '../reducers/notificationReducer'

const notificaionStyles = {
  success: {
    symbol: 'verified',
    symbolColor: 'text-green-600',
    titleColor: 'text-green-800',
    textColor: 'text-green-800',
    backgroundColor: 'bg-green-100',
    borderColor: 'border-green-600',
  },
  error: {
    symbol: 'cancel',
    symbolColor: 'text-red-600',
    titleColor: 'text-red-800',
    textColor: 'text-red-800',
    backgroundColor: 'bg-red-100',
    borderColor: 'border-red-600',
  },
  warn: {
    symbol: 'warning',
    symbolColor: 'text-yellow-500',
    titleColor: 'text-yellow-800',
    textColor: 'text-yellow-800',
    backgroundColor: 'bg-amber-100',
    borderColor: 'border-yellow-500',
  },
  ready: {
    symbol: 'info',
    symbolColor: 'text-violet-700',
    titleColor: 'text-text-primary',
    textColor: 'text-text-secondary',
    backgroundColor: 'bg-gray-100',
    borderColor: 'border-violet-700',
  },
  default: {
    symbol: null,
    symbolColor: 'text-text-primary',
    titleColor: 'text-text-primary',
    textColor: 'text-text-secondary',
    backgroundColor: 'bg-gray-100',
    borderColor: 'border-gray-400',
  },
  info: {
    symbol: 'info',
    symbolColor: 'text-cyan-600',
    titleColor: 'text-cyan-800',
    textColor: 'text-cyan-800',
    backgroundColor: 'bg-cyan-100',
    borderColor: 'border-cyan-600',
  },
}

/* Example notifications
const notifications: Notificationstatus[] = [
  {
    title: 'Custom code is not validated',
    message: [`Incorrect code may impact you website's performance.`],
    status: 'default',
    symbol: false,
    border: true,
    closable: false,
  },
  {
    title: 'The data you requested is ready!',
    message: null,
    status: 'ready',
    symbol: true,
    border: true,
    closable: true,
  },
  {
    title: 'You have no credits left!',
    message: 'Upgrade to continue',
    status: 'warn',
    symbol: true,
    closable: false,
  },
  {
    title: 'Warning',
    message: 'Youre password strength is too low',
    status: 'warn',
    symbol: true,
    closable: true,
  },
  {
    title: 'Successfully uploaded!',
    message: null,
    status: 'success',
    symbol: true,
    closable: true,
  },
  {
    title: `A new sofware update is available. See what's new in version 2.0.`,
    message: null,
    status: 'info',
    symbol: true,
    closable: true,
  },
  {
    title: `Did you know?`,
    message: `Here's something you'd like to know.`,
    status: 'info',
    symbol: true,
    closable: true,
  },
  {
    title: `There was a problem with your submission`,
    message: [
      `Must include at least 1 number`,
      `Must include at least 2 uppercase letters`,
    ],
    status: 'error',
    symbol: true,
    closable: false,
    border: true,
  },
]
*/

const Notification: React.FC = () => {
  const { title, message, status, symbol, border, closable } = useSelector(
    (state: RootState) => state.notification
  )
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(clearNotification())
  }

  if ((!title && !message) || !status) return null

  return (
    <div
      className={`flex gap-x-4 justify-between p-4 ${
        border
          ? `rounded-r-lg border-l-2 ${notificaionStyles[status].borderColor}`
          : 'rounded-lg'
      } ${notificaionStyles[status].backgroundColor}`}
    >
      <div
        className={`flex gap-x-4 ${notificaionStyles[status].backgroundColor}`}
      >
        {symbol && (
          <i
            className={`material-icons ${notificaionStyles[status].symbolColor}`}
          >
            {notificaionStyles[status].symbol}
          </i>
        )}
        <div
          className={`justify-self-start flex flex-wrap gap-x-4 ${
            message && Array.isArray(message) ? 'flex-col gap-y-2' : ''
          }`}
        >
          {title && (
            <div
              className={`font-semibold ${notificaionStyles[status].titleColor}`}
            >
              {title}
            </div>
          )}

          {message &&
            (Array.isArray(message) ? (
              message.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${notificaionStyles[status].textColor}`}
                >
                  {msg}
                </div>
              ))
            ) : (
              <div className={notificaionStyles[status].textColor}>
                {message}
              </div>
            ))}
        </div>
      </div>
      {closable && (
        <button
          className="justify-self-end self-start flex items-center"
          onClick={handleClose}
        >
          <i className={`material-icons text-text-secondary`}>close</i>
        </button>
      )}
    </div>
  )
}

export default Notification
