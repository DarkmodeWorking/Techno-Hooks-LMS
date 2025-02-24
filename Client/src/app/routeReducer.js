import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../store/authSlice'
import { authApi } from '@/store/api/authAPI'
import { courseApi } from '@/store/api/courseAPI'
import { purchaseApi } from '@/store/api/purchaseAPI'
import { progressApi } from '@/store/api/progressAPI'

const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [progressApi.reducerPath]:progressApi.reducer,
    auth: authReducer
})

export default rootReducer