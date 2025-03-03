import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const COURSE_API = 'https://techschool-20xi.onrender.com/api/v1/course'
// const COURSE_API = 'http://localhost:8080/api/v1/course'

export const courseApi = createApi({
    reducerPath: 'courseAPI',
    tagTypes: ['Refetch-Creater-Course', 'Refetch-Lecture'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({courseTitle, category}) => ({
                url: '',
                method: 'POST',
                body: {courseTitle, category}
            }),
            invalidatesTags: ['Refetch-Creater-Course']
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: '',
                method: 'GET'
            }),
            providesTags: ['Refetch-Creater-Course']
        }),
        editCourse: builder.mutation({
            query: ({formData, courseId}) => ({
                url: `/${courseId}`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['Refetch-Creater-Course']
        }),
        getCoursebyId: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: 'GET'
            })
        }),
        createLecture: builder.mutation({
            query: ({lectureTitle, courseId}) => ({
                url: `/${courseId}/lecture`,
                method: 'POST',
                body: {lectureTitle}
            }),
            providesTags: ['Refetch-Lecture']
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: 'GET'
            }),
            providesTags: ['Refetch-Lecture']
        }),
        editLecture: builder.mutation({
            query: ({lectureTitle, videoInfo, isPreviewFree, courseId, lectureId}) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: 'POST',
                body: {lectureTitle, videoInfo, isPreviewFree}
            }),
            invalidatesTags: ['Refetch-Lecture']
        }),
        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Refetch-Lecture']
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: 'GET'
            }),
            providesTags: ['Refetch-Lecture']
        }),
        publishCourse: builder.mutation({
            query: ({courseId, query}) => ({
                url: `/${courseId}?publish=${query}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Refetch-Creater-Course']
        }),
        getPublishedCourse: builder.query({
            query: () => ({
                url: '/published-courses',
                method: 'GET'
            })
        }),
        getSearchCourse:builder.query({
            query: ({searchQuery, categories, sortByPrice}) => {
              // Build qiery string
              let queryString = `/search?query=${encodeURIComponent(searchQuery)}`
      
              // append cateogry 
              if(categories && categories.length > 0) {
                const categoriesString = categories.map(encodeURIComponent).join(",");
                queryString += `&categories=${categoriesString}`; 
              }
      
              // Append sortByPrice is available
              if(sortByPrice){
                queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`; 
              }
      
              return {
                url:queryString,
                method:"GET", 
              }
            }
          }),
    })
})

export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCoursebyIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useGetPublishedCourseQuery,
    useGetSearchCourseQuery
} = courseApi