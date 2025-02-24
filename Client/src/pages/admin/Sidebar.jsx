import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex mt-16'>
      <div className='hidden lg:block fixed top-16 left-0 w-[250px] sm:w-[300px] space-y-8 border-r border-secondary dark:border-secondary p-5 h-[calc(100vh-4rem)] overflow-y-hidden'>
        <div className='space-y-6'>
          <Link to='/admin/dashboard' className='flex items-center gap-2'>
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to='/admin/course' className='flex items-center gap-2'>
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className='flex-1 ml-[250px] sm:ml-[300px] md:p-16 p-2 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar
