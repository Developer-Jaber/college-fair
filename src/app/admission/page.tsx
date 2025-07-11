'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiChevronDown, FiUpload, FiCalendar } from 'react-icons/fi';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

// Define form schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  dob: z.string().min(1, 'Date of birth is required'),
  subject: z.string().min(2, 'Subject must be at least 2 characters'),
  image: z.any().refine((file) => file?.length !== 0, 'Image is required')
});

type FormData = z.infer<typeof formSchema>;

const colleges = [
  { id: 1, name: 'Stanford University', logo: 'https://i.ibb.co/2K8Q0f8/image.png' },
  { id: 2, name: 'Harvard University', logo: 'https://i.ibb.co/fGxqfbnp/image.png' },
  { id: 3, name: 'MIT', logo: 'https://i.ibb.co/pBbSsXgq/image.png'},
];

export default function AdmissionPortal() {
  const [selectedCollege, setSelectedCollege] = useState<typeof colleges[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log('Submitting:', { college: selectedCollege, ...data });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    alert('Application submitted successfully!');
    reset();
    setSelectedCollege(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setValue('image', e.target.files[0]);
    }
  };

  return (
    <div className="bg-[var(--bg-color)] px-4 sm:px-6 lg:px-8 py-32 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl md:text-5xl">
            <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 text-transparent">
              Admission Portal
            </span>
          </h1>
          <p className="text-gray-600 text-xl">
            Begin your academic journey with us
          </p>
        </div>

        {/* College Selection */}
        {!selectedCollege ? (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="font-semibold text-gray-800 text-2xl">
                Select Your College
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center hover:bg-gray-50 p-6 transition-colors cursor-pointer"
                  onClick={() => setSelectedCollege(college)}
                >
                  <div className="bg-gray-100 shadow-sm mr-4 border-2 border-white rounded-full w-16 h-16 overflow-hidden">
                    <Image
                      width={64}
                      height={64}
                      src={college.logo}
                      alt={college.name}
                      className="p-2 w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {college.name}
                    </h3>
                  </div>
                  <FiChevronDown className="text-gray-400 rotate-90 transform" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Form Header */}
            <div className="flex items-center p-6 border-b">
              <button
                title='Go back to college selection'
                onClick={() => setSelectedCollege(null)}
                className="hover:bg-gray-100 mr-4 p-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div>
                <h2 className="font-semibold text-gray-800 text-2xl">
                  Application to {selectedCollege.name}
                </h2>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 border-b font-medium text-gray-800 text-lg">
                    Personal Information
                  </h3>
                  
                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-red-600 text-sm">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <FiCalendar className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 transform" />
                      <input
                        type="date"
                        {...register('dob')}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.dob && (
                      <p className="mt-1 text-red-600 text-sm">{errors.dob.message}</p>
                    )}
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="pb-2 border-b font-medium text-gray-800 text-lg">
                    Academic Information
                  </h3>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Intended Subject/Major *
                    </label>
                    <input
                      {...register('subject')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-red-600 text-sm">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Address *
                    </label>
                    <textarea
                      {...register('address')}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-red-600 text-sm">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700 text-sm">
                      Profile Photo *
                    </label>
                    <div className="flex justify-center items-center w-full">
                      <label className="flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg w-full h-32 cursor-pointer">
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                          <FiUpload className="mb-2 w-8 h-8 text-gray-400" />
                          <p className="text-gray-500 text-sm">
                            {watch('image')?.name ? (
                              <span className="font-medium">{watch('image').name}</span>
                            ) : (
                              <>
                                <span className="font-semibold">Click to upload</span>
                              </>
                            )}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    {errors.image && (
                      <p className="mt-1 text-red-600 text-sm">{errors.image.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 rounded-lg font-medium text-white ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 shadow-md'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}