import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const PROGRESS_API = 'https://techschool-20xi.onrender.com/api/v1/progress'
// const PROGRESS_API = 'http://localhost:8080/api/v1/progress'

export const progressApi = createApi({
    reducerPath: 'progressAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: PROGRESS_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: 'GET'
            })
        }),
        updateLectureProgress: builder.mutation({
            query: ({courseId, lectureId}) => ({
                url: `/${courseId}/lecture/${lectureId}/view`,
                method: 'POST'
            })
        }),
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/complete`,
                method: 'POST'
            })
        }),
        incompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/incomplete`,
                method: 'POST'
            })
        })
    })
})

export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgressMutation,
    useCompleteCourseMutation,
    useIncompleteCourseMutation
} = progressApi