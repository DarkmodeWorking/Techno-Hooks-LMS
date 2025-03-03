import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const searchHandler = (e) => {
		e.preventDefault()
		if (searchQuery.trim() !== '') {
			navigate(`/course/search?query=${searchQuery}`)
		}
		setSearchQuery('')
	}

  return (
    <div className='relative bg-gradient-to-r from-slate-200 to bg-slate-300 dark:from-slate-800 dark:to-slate-900 py-16 px-4 text-center mt-16'>
			<div className='max-w-3xl mx-auto'>
				<h1 className='text-4xl font-bold mb-4'>Learn - Build - Innovate</h1>
				<p className='text-gray-600 dark:text-gray-300 mb-8'>Cutting-edge courses in Web Dev, App Dev, Cloud, Core Courses, UI UX, Artificial Intelligence, Data Science, Cyber Security, Dev Ops and more to Upskill for the future!</p>
				<form onSubmit={searchHandler} className='flex items-center bg-[#ffffff77] dark:bg-[#00000077] rounded-full shadow-xl overflow-hidden mb-8'>
					<Input 
						type='text' 
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='flex-grow border-none focus-visible:ring-0 px-6 py-3 placeholder-gray-900 dark:placeholder-gray-200' 
						placeholder='Search Courses' />
					<Button type='submit' className='px-6 py-3 rounded-r-full'>Search</Button>
				</form>
				<Button onClick={() => navigate(`/course/search?query`)} className='rounded-full'>Explore All Courses</Button>
			</div>
    </div>
  )
}

export default HeroSection