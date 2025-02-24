import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/store/api/courseAPI'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
	const [courseTitle, setCourseTitle] = useState('')
	const [category, setCategory] = useState('')
	const [createCouse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation()
	const navigate = useNavigate()

	const getSelectedCategory = (value) => {
		setCategory(value)
	}

	const createCourseHandler = async () => {
		await createCouse({courseTitle, category})
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success(data?.message || 'Course created successfully')
			navigate('/admin/course')
		}
	}, [isSuccess, error])

  return (
    <div className='flex-1 mx-10'>
			<div className='mb-4'>
				<h1 className='font-bold text-xl'>Lets create your new course</h1>
				<p className='text-sm'>You can create your own course by filling up the following things which will add up for the course view</p>
			</div>
			<div className='space-y-4'>
				<div>
					<Label>Title</Label>
					<Input type='text' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} placeholder='Your Course Name' />
				</div>
				<div>
					<Label>Category</Label> 
					<Select onValueChange={getSelectedCategory}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Categories</SelectLabel>
								<SelectItem value="programming">Programming</SelectItem>
								<SelectItem value="ui-ux">UI / UX Designing</SelectItem>
								<SelectItem value="front-end-web">Front Web Development</SelectItem>
								<SelectItem value="front-end-app">Front App Development</SelectItem>
								<SelectItem value="back-end">Back End Development</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='flex items-center gap-2'>
					<Button variant='outline' onClick={() => navigate('/admin/course')}>Back</Button>
					<Button disabled={isLoading} onClick={createCourseHandler}>
						{
							isLoading ? (
								<>
									<Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
								</>
							) : 'Create'
						}
					</Button>
				</div>
			</div>
    </div>
  )
}

export default AddCourse