import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="animate-pulse w-full">
      {/* Hero Section Skeleton */}
      <div className="h-screen w-full bg-gray-200 relative">
        <div className="absolute bottom-1/4 left-10 max-w-xl">
          <div className="h-12 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="h-8 bg-gray-300 rounded w-full mb-8"></div>
          <div className="h-14 bg-gray-300 rounded-xl w-48"></div>
        </div>
      </div>

      {/* Theme Section Skeleton */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 h-96 bg-gray-200 rounded-2xl"></div>
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-24 bg-gray-200 rounded-lg w-full"></div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
                <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fundamental Truths Skeleton */}
      <div className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
          <div className="h-1 bg-gray-400 w-24 mx-auto mb-8"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
        </div>
      </div>

      {/* Events & Message Section Skeleton */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Events Column */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="h-1 bg-gray-300 w-24 mb-8"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-200 rounded-lg w-16 h-16 mr-4"></div>
                      <div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Column */}
            <div className="bg-white rounded-xl shadow-sm h-fit">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 rounded-lg w-20 h-8 mr-3"></div>
                  <div className="bg-gray-200 rounded w-16 h-4"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Services Skeleton */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
            <div className="h-1 bg-gray-300 w-24 mx-auto mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}