// 'use client'
// import React from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { supabase } from '../../lib/supabase'

// export default function BillPage() {
//   const params = useParams()
//   const router = useRouter()
//   const [item, setItem] = React.useState(null)
//   const [loading, setLoading] = React.useState(true)

//   React.useEffect(() => {
//     async function fetchItem() {
//       try {
//         const { data, error } = await supabase
//           .from('food_items')
//           .select('*')
//           .eq('id', params.id)
//           .single()

//         if (error) throw error
//         setItem(data)
//       } catch (error) {
//         console.error('Error fetching item:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchItem()
//   }, [params.id])

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="animate-pulse text-lg font-semibold text-indigo-600">
//           Loading...
//         </div>
//       </div>
//     )
//   }

//   if (!item) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-lg text-red-600">Item not found</div>
//       </div>
//     )
//   }

//   const daysUntilExpiry = Math.ceil(
//     (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24)
//   )

//   return (
//     <div className="min-h-screen bg-gray-50 item-center justify-center py-12">
//       <div className="max-w-3xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-indigo-600 px-6 py-4">
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-bold text-white">Item Details</h1>
//               <button
//                 onClick={() => router.back()}
//                 className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
//               >
//                 Back
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Expiry Status */}
//               <div className={`p-28 rounded-lg ${
//                 daysUntilExpiry <= 3
//                   ? 'bg-red-50 border border-red-200'
//                   : daysUntilExpiry <= 7
//                   ? 'bg-yellow-50 border border-yellow-200'
//                   : 'bg-green-50 border border-green-200'
//               }`}>
//                 <p className={`text-center font-semibold ${
//                   daysUntilExpiry <= 3
//                     ? 'text-red-700'
//                     : daysUntilExpiry <= 7
//                     ? 'text-yellow-700'
//                     : 'text-green-700'
//                 }`}>
//                   {daysUntilExpiry <= 0
//                     ? 'Item has expired'
//                     : `${daysUntilExpiry} days until expiry`}
//                 </p>
//               </div>

//               {/* Details Section */}
//               <div className="space-y-6">
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <h2 className="text-xl font-bold text-gray-900 mb-4">{item.name}</h2>
                  
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">Quantity</span>
//                       <span className="text-gray-900">{item.quantity}</span>
//                     </div>

//                     <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">Upload Date</span>
//                       <span className="text-gray-900">
//                         {new Date(item.manufacture_date).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </span>
//                     </div>

//                     <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">Expiry Date</span>
//                       <span className="text-gray-900">
//                         {new Date(item.expiry_date).toLocaleDateString('en-US', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric'
//                         })}
//                       </span>
//                     </div>

//                     <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">Location</span>
//                       <span className="text-gray-900">{item.address}</span>
//                     </div>

//                     {/* Google Maps Link */}
//                     <div className="mt-4">
//                       <a
//                         href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                           item.address
//                         )}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-indigo-600 hover:underline"
//                       >
//                         View on Google Maps
//                       </a>
//                     </div>
                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function BillPage() {
  const params = useParams()
  const router = useRouter()
  const [item, setItem] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data, error } = await supabase
          .from('food_items')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setItem(data)
      } catch (error) {
        console.error('Error fetching item:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-lg font-semibold text-indigo-600">
          Loading...
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-red-600">Item not found</div>
      </div>
    )
  }

  const daysUntilExpiry = Math.ceil(
    (new Date(item.expiry_date) - new Date()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div
      className="min-h-screen bg-gray-50 item-center justify-center py-12"
      style={{
        backgroundImage: "url('/pexels-shvetsa-3645504.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Item Details</h1>
              <button
                onClick={() => router.back()}
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              >
                Back
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expiry Status */}
              <div
                className={`p-28 rounded-lg ${
                  daysUntilExpiry <= 3
                    ? 'bg-red-50 border border-red-200'
                    : daysUntilExpiry <= 7
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-green-50 border border-green-200'
                }`}
              >
                <p
                  className={`text-center font-semibold ${
                    daysUntilExpiry <= 3
                      ? 'text-red-700'
                      : daysUntilExpiry <= 7
                      ? 'text-yellow-700'
                      : 'text-green-700'
                  }`}
                >
                  {daysUntilExpiry <= 0
                    ? 'Item has expired'
                    : `${daysUntilExpiry} days until expiry`}
                </p>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{item.name}</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Quantity</span>
                      <span className="text-gray-900">{item.quantity}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Upload Date</span>
                      <span className="text-gray-900">
                        {new Date(item.manufacture_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Expiry Date</span>
                      <span className="text-gray-900">
                        {new Date(item.expiry_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Location</span>
                      <span className="text-gray-900">{item.address}</span>
                    </div>

                    {/* Google Maps Link */}
                    <div className="mt-4">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          item.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
