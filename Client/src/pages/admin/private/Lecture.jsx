import { Edit, Edit2 } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({lecture, courseId, index}) => {
	const navigate = useNavigate()
	const goToUpdateLecture = () => {
		navigate(`${lecture._id}`)
	}

  return (
    <div className='flex items-center justify-between px-4 py-2 rounded-md my-2'>
			<h1 className='font-bold'> Lecture {index + 1} - {lecture.lectureTitle}</h1>
			<Edit onClick={goToUpdateLecture} size={20} className='cursor-pointer hover:text-primary' />
    </div>
  )
}

export default Lecture