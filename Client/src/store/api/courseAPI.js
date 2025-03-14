import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const COURSE_API = 'https://techno-hooks-lms.onrender.com/api/v1/course'
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
		deleteCourse: builder.mutation({
			query: (courseId) => ({
				url: `${courseId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Refetch-Creater-Course']
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
              	let queryString = `/search?query=${encodeURIComponent(searchQuery)}`
              	if(categories && categories.length > 0) {
                	const categoriesString = categories.map(encodeURIComponent).join(",")
                	queryString += `&categories=${categoriesString}`
      	 	    }
   	            if(sortByPrice){
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
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
	useDeleteCourseMutation,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useGetPublishedCourseQuery,
    useGetSearchCourseQuery
} = courseApi