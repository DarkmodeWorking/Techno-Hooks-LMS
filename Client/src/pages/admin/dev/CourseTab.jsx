import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEditCourseMutation, useGetCoursebyIdQuery, usePublishCourseMutation } from '@/store/api/courseAPI'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: '',
    subTitle: '',
    description: '',
    category: '',
    courseLevel: '',
    coursePrice: '',
    courseThumbnail: ''
  })

  const params = useParams()
  const courseId = params.courseId

  const {data: coursebyIdData, isLoading: courseByIdLoading, refetch} = useGetCoursebyIdQuery(courseId, {refetchOnMountOrArgChange: true})

  const [publishCourse, {}] = usePublishCourseMutation()

  useEffect(() => {
    if (coursebyIdData?.course) {
      const course = coursebyIdData?.course
      setInput ({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: ''
      })
    }
  }, [coursebyIdData])

  const [previewThumbnail, setPreviewThumbnail] = useState('')

  const navigate = useNavigate()

  const [editCourse, {data, isLoading, isSuccess, error}] = useEditCourseMutation()
  
  const changeEventHandler = (e) => {
    const {name, value} = e.target
    setInput({...input, [name]: value})
  }

  const selectCategory = (value) => {
    setInput({...input, category: value})
  }

  const selectCourseLevel = (value) => {
    setInput({...input, courseLevel: value})
  }

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setInput({...input, courseThumbnail: file})
      const fileReader = new FileReader()
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result)
      fileReader.readAsDataURL(file)
    }
  }

  const updateCourseHandler = async () => {
    const formData = new FormData()
    formData.append('courseTitle', input.courseTitle)
    formData.append('subTitle', input.subTitle)
    formData.append('description', input.description)
    formData.append('category', input.category)
    formData.append('courseLevel', input.courseLevel)
    formData.append('coursePrice', input.coursePrice)
    formData.append('courseThumbnail', input.courseThumbnail)
    await editCourse({formData, courseId})
  }

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query: action})
      if (response.data) {
        refetch()
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to Publish / Unpublish Course')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success( 'Course updated')
    }
    if (error) {
      toast.error( 'Failed to update Course')
    }
  }, [isSuccess, error])

  if (courseByIdLoading) {
    return <h1>Loading...</h1>
  }
  
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <div>
          <CardTitle>Update your Course</CardTitle>
          <CardDescription>Make changes to your courses here and then proceed to save when done</CardDescription>
        </div>
        <div className='flex gap-4'>
          <Button disabled={coursebyIdData?.course.lectures.length === 0} variant='outline' onClick={() => publishStatusHandler(coursebyIdData?.course.isPublished ? 'false': 'true')}>
            {
              coursebyIdData?.course.isPublished ? (
                'Unpublish'
              ) : (
                'Publish'
              )
            }
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4 mt-5'>
          <div>
            <Label>Title</Label>
            <Input type='text' name='courseTitle' value={input.courseTitle} onChange={changeEventHandler} placeholder='Course Title' />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input type='text' name='subTitle' value={input.subTitle} onChange={changeEventHandler} placeholder='A brief description of the provided course' />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className='flex items-center gap-5'>
            <div>
              <Label>Course Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="ui-ux">UI / UX Designing</SelectItem>
                    <SelectItem value="front-end-web">Front Web Development</SelectItem>
                    <SelectItem value="front-end-app">Front App Development</SelectItem>
                    <SelectItem value="back-end">Back End Development</SelectItem>
                    <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                    <SelectItem value="ai-ml">Artificial Intelligence</SelectItem>
                    <SelectItem value="cyber-secuirty">Cybersecurity</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="dev-ops">Dev Ops</SelectItem>
                    <SelectItem value="databases">Databases</SelectItem>
                    <SelectItem value="quantum">Quantum Computing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Difficulty</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Difficulty</SelectLabel>
                    <SelectItem value="novice">Novice</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="elite">Elite</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in INR (&#8377;)</Label>
              <Input type='number' name='coursePrice' value={input.coursePrice} onChange={changeEventHandler} placeholder='---' className='w-fit' />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type='file' onChange={selectThumbnail} accept='image/*' className='w-fit' />
            {
              previewThumbnail && (
                <img src={previewThumbnail} className='w-64 my-2' alt='Course Thumbnail' />
              )
            }
          </div>
          <div>
            <Button onClick={() => navigate('/admin/course')} variant='outline'>Cancel</Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {
                isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please Wait
                  </>
                ) : (
                  'Save'
                )
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab