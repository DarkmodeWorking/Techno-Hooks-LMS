import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const PURCHASE_API = 'https://techschool-20xi.onrender.com/api/v1/purchase'
// const PURCHASE_API = 'http://localhost:8080/api/v1/purchase'

export const purchaseApi = createApi({
    reducerPath: 'purchaseAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: PURCHASE_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation({
            query: (courseId) => ({
                url: '/checkout/create-checkout-session',
                method: 'POST',
                body: {courseId}
            })
        }),
        getCourseDetailWithStatus: builder.query({
            query: (courseId) => ({
                url: `/course/${courseId}/detail-with-status`,
                method: 'GET'
            })
        }),
        getPurchasedCourses: builder.query({
            query: () => ({
                url: `/`,
                method: 'GET'
            })
        })
    })
})

export const {
    useCreateCheckoutSessionMutation,
    useGetCourseDetailWithStatusQuery,
    useGetPurchasedCoursesQuery
} = purchaseApi