import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import HeroSection from './pages/client/HeroSection'
import Login from './pages/Login'
import Courses from './pages/client/Courses'
import MyCourses from './pages/client/MyCourses'
import Profile from './pages/client/Profile'
import Sidebar from './pages/admin/Sidebar'
import Dashboard from './pages/admin/Dashboard'
import CourseTable from './pages/admin/dev/CourseTable'
import AddCourse from './pages/admin/dev/AddCourse'
import EditCourse from './pages/admin/dev/EditCourse'
import { ThemeProvider } from './components/ThemeProvider'
import CreateLecture from './pages/admin/private/CreateLecture'
import EditLecture from './pages/admin/private/EditLecture'
import CourseDetail from './pages/client/CourseDetail'
import CourseProgress from './pages/client/CourseProgress'
import SearchPage from './pages/client/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/PurchaseCourseProtectedRoute'

const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
    children: [
      {
        path: '/',
        element: 
          <>
            <HeroSection />
            <Courses />
          </>
      },
      {
        path: '/login',
        element: 
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser> 
      },
      {
        path: '/my-courses',
        element: 
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
      },
      {
        path: '/profile',
        element: 
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
      },
      {
        path: 'course/search',
        element: 
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
      },
      {
        path: '/course-detail/:courseId',
        element: 
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
      },
      {
        path: '/course-progress/:courseId',
        element: 
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>        
          </ProtectedRoute>
      },
      {
        path: 'admin',
        element: 
        
            <Sidebar />,
          
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'course',
            element: <CourseTable />
          },
          {
            path: 'course/create',
            element: <AddCourse />
          },
          {
            path: 'course/:courseId',
            element: <EditCourse />
          },
          {
            path: 'course/:courseId/lecture',
            element: <CreateLecture />
          },
          {
            path: 'course/:courseId/lecture/:lectureId',
            element: <EditLecture />
          }
        ]
      }
    ]
	}
])

function App() {
  return (
    <>
      <main>
        <ThemeProvider>
          <RouterProvider router={appRouter} />
        </ThemeProvider> 
      </main>
    </>
  )
}

export default App
