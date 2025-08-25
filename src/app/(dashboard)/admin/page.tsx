// app/(dashboard)/admin/page.tsx
import { requireAdmin } from '@/lib/auth-utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, CreditCard } from 'lucide-react'

export default async function AdminDashboard() {
  // Server-side authentication check
  const user = await requireAdmin()

  // Mock data - replace with actual data fetching
  const stats = {
    totalStudents: 1250,
    totalCourses: 45,
    totalFaculty: 85,
    totalRevenue: 125000
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Students</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalStudents.toLocaleString()}</div>
            <p className="text-muted-foreground text-xs">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Courses</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalCourses}</div>
            <p className="text-muted-foreground text-xs">+3 new this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Faculty Members</CardTitle>
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{stats.totalFaculty}</div>
            <p className="text-muted-foreground text-xs">+5% from last year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-muted-foreground text-xs">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="gap-6 grid md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Replace with actual data */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-gray-500 text-xs">Computer Science</p>
                </div>
                <div className="text-gray-500 text-xs">2 hours ago</div>
              </div>
              {/* More items... */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Database</span>
                <span className="bg-green-100 px-2 py-1 rounded text-green-800 text-xs">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Payment Gateway</span>
                <span className="bg-green-100 px-2 py-1 rounded text-green-800 text-xs">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Email Service</span>
                <span className="bg-green-100 px-2 py-1 rounded text-green-800 text-xs">Online</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}