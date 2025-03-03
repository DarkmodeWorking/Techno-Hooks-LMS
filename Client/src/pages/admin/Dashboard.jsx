import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetPurchasedCoursesQuery } from '@/store/api/purchaseAPI'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Dashboard = () => {
	const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery()

	if (isLoading) {
		return <h1>Loading...</h1>
	}
	if (isError) {
		return <h1>Failed to get purchased courses</h1>
	}

	const {purchasedCourse} = data || []
	
	const courseData = purchasedCourse.map((course) => ({
		name: course.courseId.courseTitle,
		price: course.courseId.coursePrice
	}))

	const totalSales = purchasedCourse.length
	const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0)

  return (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
			<Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
				<CardHeader>
					<CardTitle>Total Sales</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-3xl font-bold text-primary'>{totalSales}</p>
				</CardContent>
			</Card>
			<Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
				<CardHeader>
					<CardTitle>Total Revenue</CardTitle>
				</CardHeader>
				<CardContent>
					<p className='text-3xl font-bold text-primary'>{totalRevenue}</p>
				</CardContent>
			</Card>

			<Card className='shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>Course Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={350}> 
            <LineChart data={courseData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray='3 3' stroke='#e0e0e0' />
              <XAxis
                dataKey='name'
                stroke='#6b7280'
                angle={-40} 
                textAnchor='end'
                interval={0} 
                height={70} 
              />
              <YAxis stroke='#6b7280' />
              <Tooltip
                formatter={(value, name) => [`₹${value}`, name]}
                contentStyle={{ backgroundColor: '#1c1917', color: '#fff', borderRadius: '8px' }}
              />
              <Line
                type='monotone'
                dataKey='price'
                stroke='#ff004f'
                strokeWidth={3}
                dot={{ stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard