
'use client'
import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { CheckCircle2 } from "lucide-react"

export default function AddFoodForm({ onItemAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    manufactureDate: '',
    expiryDate: '',
    address: '',
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imagePath = null

      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${Math.random()}-${Date.now()}.${fileExt}`
        imagePath = fileName

        const { error: uploadError } = await supabase.storage
          .from('food-images')
          .upload(imagePath, image, {
            cacheControl: '3600',
            upsert: false
          })

        if (uploadError) {
          throw new Error(`Upload error: ${uploadError.message}`)
        }
      }

      const { error: insertError } = await supabase
        .from('food_items')
        .insert([
          {
            name: formData.name,
            quantity: parseInt(formData.quantity),
            manufacture_date: formData.manufactureDate,
            expiry_date: formData.expiryDate,
            image_path: imagePath,
            address: formData.address,
          },
        ])

      if (insertError) {
        throw new Error(`Insert error: ${insertError.message}`)
      }

      // Reset form
      setFormData({
        name: '',
        quantity: '',
        manufactureDate: '',
        expiryDate: '',
        address: '',
      })
      setImage(null)
      setImagePreview(null)

      // Show success message
      setShowSuccess(true)
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

      if (onItemAdded) {
        onItemAdded()
      }
    } catch (error) {
      console.error('Error adding food item:', error.message)
      alert(`Error adding food item: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Food item added successfully!
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-14 ">
        <h2 className="text-3xl font-semibold text-black mb-6">Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className=''>
              <label className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-black rounded-md border border-gray-300 px-4 py-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="1"
                className="mt-1 block w-full text-black rounded-md border border-gray-300 px-4 py-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload Date
              </label>
              <input
                type="date"
                name="manufactureDate"
                value={formData.manufactureDate}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-black rounded-md border border-gray-300 px-4 py-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full text-black rounded-md border border-gray-300 px-4 py-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-lg text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full text-black rounded-md border border-gray-300 px-4 py-5 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>
    </div>
  )
}