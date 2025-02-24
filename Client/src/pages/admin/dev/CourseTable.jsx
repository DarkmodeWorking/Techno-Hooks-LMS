import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/store/api/courseAPI'
import { Edit3 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseTable = () => {
  const {data, isLoading} = useGetCreatorCourseQuery()
	const navigate = useNavigate()

  if (isLoading) {
    return <h1>Loading...</h1>
  }
	
  return (
    <div>
      <Button onClick={() => navigate(`create`)}>Create a new Course</Button>
			<Table className='mt-10'>
				<TableCaption>A list of all of the courses</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Course Title</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.courses.map((course) => (
						<TableRow key={course._id}>
							<TableCell className="font-medium">{course.courseTitle}</TableCell>
							<TableCell>{course?.coursePrice || 'NA'}</TableCell>
							<TableCell><Badge>{course.isPublished ? 'Published' : 'Draft'}</Badge></TableCell>
							<TableCell className="text-right">
                <Button size='sm' onClick={() => navigate(`${course._id}`)}><Edit3 /></Button>
              </TableCell>
						</TableRow>
					))}
				</TableBody> 
    	</Table>
    </div>
  )
}

export default CourseTable