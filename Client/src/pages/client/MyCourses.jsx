import React from 'react'
import Course from './Course'
import { useLoadUserQuery } from '@/store/api/authAPI'

const MyCourses = () => {
	const {data, isLoading} = useLoadUserQuery()
	const myCourses = data?.user.enrolledCourses || []

	console.log(data)

  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-'>
			<h1 className='font-bold text-2xl'>My Courses</h1>
			<div className='my-5'> 
				{
					isLoading ? (
						<MyCoursesSkeleton />
					) : myCourses.length === 0 ? (
							<p>You are not enrolled in any course</p> 
						) : (
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
								{
									myCourses.map((course, index) => (
										<Course key={index} course={course} />
									))
								}
							</div>
						)
				}
			</div>
    </div>
  )
}

export default MyCourses

const MyCoursesSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className=" rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
)
