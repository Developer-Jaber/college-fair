// app/(dashboard)/student/page.tsx
import { requireStudent } from '@/lib/auth-utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calendar, Award, ClipboardList, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function StudentDashboard() {
  // Server-side authentication check
  const user = await requireStudent()

  // Mock data - replace with actual data fetching based on user.id
  const studentData = {
    enrolledCourses: 6,
    completedAssignments: 12,
    upcomingAssignments: 3,
    currentGPA: 3.8,
    upcomingClasses: [
      { name: 'Mathematics', time: '10:00 AM', room: 'Room 101' },
      { name: 'Physics', time: '2:00 PM', room: 'Lab 205' },
    ],
    recentGrades: [
      { course: 'Mathematics', assignment: 'Midterm Exam', grade: 'A-' },
      { course: 'Physics', assignment: 'Lab Report 3', grade: 'B+' },
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      {/* Quick Stats */}
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Enrolled Courses</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{studentData.enrolledCourses}</div>
            <p className="text-muted-foreground text-xs">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Completed Tasks</CardTitle>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{studentData.completedAssignments}</div>
            <p className="text-muted-foreground text-xs">Assignments submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Pending Tasks</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{studentData.upcomingAssignments}</div>
            <p className="text-muted-foreground text-xs">Due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Current GPA</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{studentData.currentGPA}</div>
            <p className="text-muted-foreground text-xs">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="gap-6 grid md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today&apos;s Schedule
            </CardTitle>
            <CardDescription>Your upcoming classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.upcomingClasses.map((class_, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{class_.name}</p>
                    <p className="text-gray-600 text-sm">{class_.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{class_.time}</p>
                  </div>
                </div>
              ))}
              <Button asChild className="w-full" variant="outline">
                <Link href="/student/schedule">View Full Schedule</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Grades
            </CardTitle>
            <CardDescription>Your latest academic performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentData.recentGrades.map((grade, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium">{grade.course}</p>
                    <p className="text-gray-600 text-sm">{grade.assignment}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      grade.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                      grade.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {grade.grade}
                    </span>
                  </div>
                </div>
              ))}
              <Button asChild className="w-full" variant="outline">
                <Link href="/student/grades">View All Grades</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid md:grid-cols-4">
            <Button asChild variant="outline" className="flex-col h-20">
              <Link href="/student/courses">
                <BookOpen className="mb-2 w-6 h-6" />
                My Courses
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-col h-20">
              <Link href="/student/assignments">
                <ClipboardList className="mb-2 w-6 h-6" />
                Assignments
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-col h-20">
              <Link href="/student/schedule">
                <Calendar className="mb-2 w-6 h-6" />
                Schedule
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-col h-20">
              <Link href="/student/grades">
                <Award className="mb-2 w-6 h-6" />
                Grades
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}