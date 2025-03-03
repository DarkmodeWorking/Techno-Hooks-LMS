import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const Course = ({course}) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className='overflow-hidden rounded-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer'>
        <div className='relative'>
          <img src={course.courseThumbnail} alt='' className='w-full h-36 object-cover rounded-t-lg' />
        </div>
        <CardContent className='px-5 py-4 space-y-3'>
          <h1 className='hover:underline font-bold text-lg truncate'>{course.courseTitle}</h1>
          <h1 className='text-sm truncate'>{course.subTitle}</h1>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={course.creator?.photoURL || 'https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users.png'} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className='font-medium text-sm'>{course.creator?.name}</h1>
            </div>
            <Badge className='px-2 py-1 text-xs rounded-full'>
              {course.courseLevel}
            </Badge>
          </div>
          <div className='text-lg font-bold text-primary'>
            Price - <span className='text-white'>₹ {course.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default Course