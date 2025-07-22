'use client'

import { useState, useEffect } from 'react'
import { FiEdit, FiTrash2, FiStar, FiCalendar, FiMail, FiPhone, FiMapPin, FiBook } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Application {
  id: string
  college: {
    id: string
    name: string
    logo: string
  }
  name: string
  email: string
  phone: string
  address: string
  dob: string
  subject: string
  imageUrl: string
  status: 'pending' | 'approved' | 'rejected'
  appliedAt: string
}

export default function MyCollegePage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admission')
        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }
        const data = await response.json()
        console.log(data);
        setApplications(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admission?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete application')
      }
      
      setApplications(applications.filter(app => app.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete application')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-center">
        <div className="mx-auto border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        <p className="mt-4">Loading your applications...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <h2 className="font-semibold text-red-600 text-xl">Error</h2>
        <p className="mt-2 text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded text-white"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!applications.length) {
    return (
      <div className="py-12 text-center">
        <h2 className="font-semibold text-xl">No applications found</h2>
        <p className="mt-2 text-gray-500">You haven&apos;t applied to any colleges yet</p>
        <button
          onClick={() => router.push('/apply')} 
          className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded text-white"
        >
          Apply Now
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-6xl">
      <h1 className="mb-8 font-bold text-3xl">My College Applications</h1>
      
      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-1">
        {applications.map(application => (
          <div 
            key={application.id}
            className="bg-white shadow-md hover:shadow-lg border border-gray-100 rounded-xl overflow-hidden transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <Image
                    src={application.college.logo}
                    alt={application.college.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-contain"
                  />
                  <div>
                    <h2 className="font-bold text-xl">{application.college.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {application.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    title='edit'
                    className="hover:bg-blue-50 p-2 rounded-full text-blue-600"
                    onClick={() => router.push(`/edit-application/${application.id}`)} 
                  >
                    <FiEdit />
                  </button>
                  <button 
                    title='delete'
                    className="hover:bg-red-50 p-2 rounded-full text-red-600"
                    onClick={() => handleDelete(application.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FiStar className="text-yellow-500" />
                  <span>Applied on: {new Date(application.appliedAt).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <FiBook className="text-purple-500" />
                  <span>Subject: {application.subject}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FiCalendar className="text-blue-500" />
                  <span>DOB: {application.dob}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FiMail className="text-green-500" />
                  <span>{application.email}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FiPhone className="text-indigo-500" />
                  <span>{application.phone}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FiMapPin className="text-red-500" />
                  <span>{application.address}</span>
                </div>
              </div>

              {application.imageUrl && (
                <div className="mt-6">
                  <h3 className="mb-2 font-medium">Submitted Photo:</h3>
                  <Image
                    src={application.imageUrl}
                    alt="Applicant"
                    width={120}
                    height={120}
                    className="border rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}