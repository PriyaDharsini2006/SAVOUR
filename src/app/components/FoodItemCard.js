'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function FoodItemCard({ item }) {
  const router = useRouter()

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilExpiry = getDaysUntilExpiry(item.expiry_date)

  return (
    <div 
      onClick={() => router.push(`/bill/${item.id}`)}
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-[300px] w-full object-contain rounded-t-lg"
          />
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-t-lg">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        {/* Hover Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-t-lg">
          <span className="text-white text-lg font-bold">View Details</span>
        </div>

        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            daysUntilExpiry <= 3
              ? 'bg-red-500 text-white'
              : daysUntilExpiry <= 7
              ? 'bg-yellow-500 text-white'
              : 'bg-green-500 text-white'
          }`}>
            {daysUntilExpiry <= 0
              ? 'Expired'
              : `${daysUntilExpiry} days left`}
          </span>
        </div>
      </div>

      <div className="p-4 ">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <span className="font-medium mr-2">Qty:</span>
            <span>{item.quantity}</span>
          </div>
          {/* <div className="flex items-center text-gray-600">
            <span className="font-medium mr-2">Uploaded:</span>
            <span>{new Date(item.manufacture_date).toLocaleDateString()}</span>
          </div> */}
          <div className="flex items-center text-gray-600">
            <span className="font-medium mr-2">Expires:</span>
            <span>{new Date(item.expiry_date).toLocaleDateString()}</span>
          </div>
          {/* <div className="flex items-center text-gray-600">
            <span className="font-medium mr-2">Location:</span>
            <span className="truncate">{item.address}</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}
