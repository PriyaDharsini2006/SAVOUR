'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AddFoodForm from '../components/AddFoodForm';
import FoodItemCard from '../components/FoodItemCard';

function Home() {
  const handleback = () => {
    window.history.back();
  };

  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    fetchFoodItems();
    checkExpiredItems();
    const interval = setInterval(checkExpiredItems, 1000 * 60 * 60 * 24); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  async function fetchFoodItems() {
    try {
      const { data, error } = await supabase
        .from('food_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const itemsWithImageUrls = await Promise.all(
        data.map(async (item) => {
          
          if (item.image_path) {
            const { data: publicUrl } = supabase.storage
              .from('food-images')
              .getPublicUrl(item.image_path);
            return { ...item, imageUrl: publicUrl.publicUrl };
          }
          return item;
        })
      );
     
      setFoodItems(itemsWithImageUrls);
    } catch (error) {
      console.error('Error fetching food items:', error.message);
    }
  }

  async function checkExpiredItems() {
    console.log("Checking expired items...");
    try {
      // Get current date and reset time to midnight
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      console.log("Current Date (for comparison):", now.toISOString().slice(0, 10));

      const { data: foodItems, error } = await supabase
        .from('food_items')
        .select('*');

      if (error) throw error;

      const expiredItems = foodItems.filter((item) => {
        if (!item.expiry_date) return false;

        // Parse the date directly since it's already in YYYY-MM-DD format
        const expiryDate = new Date(item.expiry_date);
        expiryDate.setHours(0, 0, 0, 0);
        
        console.log(`Item: ${item.name}, Expiry: ${item.expiry_date}, Expired: ${expiryDate < now}`);
        
        return expiryDate <= now;
      });

      console.log(`Found ${expiredItems.length} expired items`);

      if (expiredItems.length > 0) {
        // Delete images first
        for (const item of expiredItems) {
          if (item.image_path) {
            const { error: storageError } = await supabase.storage
              .from('food-images')
              .remove([item.image_path]);
            
            if (storageError) {
              console.error('Error removing image:', storageError);
            }
          }
        }

        // Then delete the items from the database
        const { error: deleteError } = await supabase
          .from('food_items')
          .delete()
          .in('id', expiredItems.map(item => item.id));

        if (deleteError) {
          console.error('Error deleting items:', deleteError);
          throw deleteError;
        }

        console.log(`Successfully deleted ${expiredItems.length} expired items`);
        
        // Refresh the items list
        await fetchFoodItems();
      }
    } catch (error) {
      console.error('Error handling expired items:', error.message);
    }
  }

  const filteredItems = foodItems.filter(item =>
    item.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.quantity?.toString().includes(searchQuery)
  );

  return (
    <div className="bg-gray-100">
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white fixed w-full shadow-lg z-10">
        <div className="flex items-center justify-between max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Food Waste Management</h1>
          <button
            onClick={handleback}
            className="bg-white text-blue-700 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg border-2 border-white transition duration-300"
          >
            Back
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Available Food Items</h2>

          <div className="mb-6 text-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full sm:w-1/2 p-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <FoodItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;