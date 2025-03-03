import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex mt-16'>
      <div className='hidden lg:block fixed top-16 left-0 w-[250px] sm:w-[300px] space-y-8 border-r border-secondary dark:border-secondary p-16 h-[calc(100vh-4rem)] overflow-y-hidden'>
        <div className='space-y-16'>
          <NavLink
            to='/admin/dashboard'
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive ? 'text-primary font-semibold' : 'text-foreground'
              }`
            }
          >
            <ChartNoAxesColumn size={40} />
            <h1>Dashboard</h1>
          </NavLink>    
          <NavLink
            to='/admin/course'
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors duration-200 ${
                isActive ? 'text-primary font-semibold' : 'text-foreground'
              }`
            }
          >
            <SquareLibrary size={40} />
            <h1>Courses</h1>
          </NavLink>
        </div>
      </div>
      <div className='flex-1 ml-[250px] sm:ml-[300px] md:p-16 p-2 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Sidebar