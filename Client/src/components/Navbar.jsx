import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DarkMode from '@/DarkMode'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/store/api/authAPI'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {user} = useSelector(store => store.auth)
  const [logoutUser, {data, isSuccess}] = useLogoutUserMutation()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    await logoutUser() 
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || 'Logged Out')
      navigate('/login')
    }
  }, [isSuccess])

  return (
    <div className='h-16 border-b bg-background dark:border-b-secondary border-b-secondary fixed top-0 left-0 right-0 duration-300 z-50'>
			<div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-2'>
          <School size={'30'} />
          <Link to='/'>
            <h1 className='hidden md:block font-extrabold text-2xl'>techschool.com</h1>
          </Link>     
        </div>
        <div className='flex items-center gap-4'>
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.photoURL || 'https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users.png'} alt='profilepic' />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to='my-courses'>My Courses</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to='profile'>Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {
                    user.role === 'Instructor' && (
                      <> 
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='flex justify-center font-bold '>
                          <Link to='admin/dashboard'>Dashboard</Link>
                        </DropdownMenuItem>
                      </>          
                    )
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex items-center gap-2'>
                <Button variant='outline' onClick={() => navigate('/login')}>Log In</Button>
                <Button onClick={() => navigate('/login')}>Sign Up</Button>
              </div>
            )
          }
          <DarkMode />
        </div>
      </div>
      <div className='flex md:hidden items-center justify-between px-4 h-full'>
        <h1 className='font-extrabold text-2xl'>LMS</h1>
        <MobileNavbar />
      </div>
    </div>
  )
}

export default Navbar


const MobileNavbar = () => {
  const role = 'instructor'

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' className='rounded-full bg-gray-100 hover:bg-gray-200' variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='flex flex-row items-center justify-between mt-2'>
          <SheetTitle>LMS</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className='mr-2' />
        <nav className='flex flex-col space-y-4'>
          <span>My Learning</span>
          <span>Edit Profile</span>
          <p>Log Out</p>
        </nav>
        {
          role === 'instructor' && (
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }
      </SheetContent>
    </Sheet>
  )
}