import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useCompleteCourseMutation, useGetCourseProgressQuery, useIncompleteCourseMutation, useUpdateLectureProgressMutation } from '@/store/api/progressAPI'
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseProgress = () => {
  const params = useParams()
  const courseId = params.courseId
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId)

  const [updateLectureProgress] = useUpdateLectureProgressMutation()
  const [completeCourse, 
    {data: markCompleteData, isSuccess: completedSuccess}
  ] = useCompleteCourseMutation()

  const [incompleteCourse, 
    {data: markIncompleteData, isSuccess: incompletedSuccess}
  ] = useIncompleteCourseMutation()

  useEffect(() => {
    console.log(markCompleteData)
    if (completedSuccess) {
      refetch()
      toast.success(markCompleteData.message)
    }
    if (incompletedSuccess) {
      refetch()
      toast.success(markIncompleteData.message)
    }
  }, [completedSuccess, incompletedSuccess])

  const [currentLecture, setCurrentLecture] = useState(null)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Failed to load course details</p>
  }
  
  const { courseDetails, progress, completed } = data.data
  const { courseTitle } = courseDetails

  const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0])

  const isCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({courseId, lectureId})
    refetch()
  }

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture)
    handleLectureProgress(lecture._id)
  }

  const handleCompleteCourse = async () => {
    await completeCourse(courseId)
  }

  const handleIncompleteCourse = async () => {
    await incompleteCourse(courseId)
  }

  return (
    <div className='max-w-7xl mx-auto p-4 mt-20'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold'>{courseTitle}</h1>
        <Button onClick={completed ? handleIncompleteCourse : handleCompleteCourse} variant={completed ? 'outline' : 'default'}>
          {
            completed ? (
              <div className='flex items-center'> 
                <CheckCircle className='h-4 w-4 mr-2' /> <span>Completed</span>
              </div>
            ) : (
              'Mark as completed'
            ) 
          }
        </Button>
      </div>  
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>
            <video 
              src={currentLecture?.videoUrl || initialLecture.videoUrl} 
              controls
              className='w-full h-auto md:rounded-lg'
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
              
            />
          </div>
          <div className='mt-2'>
            <h3 className='font-medium text-lg'>
              {
                `Lecture ${courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1} - ${currentLecture?.lectureTitle || initialLecture.lectureTitle}`
              }
            </h3>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-secondary md:pl-4 pt-4 md:pt-0'>
          <h2 className='font-semibold text-xl mb-4'>Course Lecture</h2>
          <div className='flex-1 overflow-y-auto'>
            {
              courseDetails?.lectures.map((lecture) => (
                <Card key={lecture._id} className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id ? 'bg-border' : 'bg-card'}`} onClick={() => handleSelectLecture(lecture)}>
                  <CardContent className='flex items-center justify-between p-4'>
                    <div className='flex items-center'>
                      {
                        isCompleted(lecture._id) ? (
                          <CheckCircle2 size={24} className='text-primary mr-2' />
                        ) : (
                          <CirclePlay size={24} className='mr-2' />
                        )
                      }
                      <div>
                        <CardTitle className='text-lg font-medium'>{lecture.lectureTitle}</CardTitle>
                      </div>
                    </div>
                    {
                      isCompleted(lecture._id) && (
                        <Badge variant={'outline'}>Completed</Badge>
                      )
                    }                   
                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress