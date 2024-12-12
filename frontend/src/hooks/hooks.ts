import { useDispatch as useDefaultDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

export const useDispatch: () => AppDispatch = useDefaultDispatch
