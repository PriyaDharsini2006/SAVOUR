// 'use client';
// import React from 'react';
// import AddFoodForm from "../components/AddFoodForm";

// export default function UserPage() {
//   const handleback = () => {
//     window.history.back();
//   };

//   return (
//     <div className="h-screen bg-gradient-to-br from-blue-50 to-white">
//       {/* Fixed Navbar at the top */}
//       <nav className="bg-gradient-to-r fixed from-blue-600 to-indigo-700 text-white fixed w-full shadow-lg z-10">
//         <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <h1 className="text-2xl font-bold">Add Food Form</h1>
//           <button
//             onClick={handleback}
//             className="bg-white text-blue-700 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg border-2 border-white transition duration-300"
//           >
//             Back
//           </button>
//         </div>
//       </nav>

//       {/* Content Area (shifted down to avoid overlap with the navbar) */}
//       <div className="pt-20 w-full h-full flex items-center justify-center">
//         <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8">
//           <div className="flex justify-center">
//             <AddFoodForm />
//           </div>
//         </div>
//       </div>

//       {/* Chatbot Script */}
//       <script
//         dangerouslySetInnerHTML={{
//           __html: `
//             window.embeddedChatbotConfig = {
//               chatbotid: "bDDi7MMWsEWiXzWeDh5Oz",
//               domain: "www.chatbase.co"
//             }
//           `,
//         }}
//       />
//       <script
//         src="https://www.chatbase.co/embed.min.js"
//         chatbotid="bDDi7MMWsEWiXzWeDh5Oz"
//         domain="www.chatbase.co"
//         defer
//       />
//     </div>
//   );
// }
'use client';
import React from 'react';
import AddFoodForm from "../components/AddFoodForm";

export default function UserPage() {
  const handleback = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Responsive Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white fixed w-full shadow-lg z-10">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold truncate mr-4">
            Add Food Form
          </h1>
          <button
            onClick={handleback}
            className="bg-white text-blue-700 hover:bg-gray-200 font-medium text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg border-2 border-white transition duration-300 whitespace-nowrap"
          >
            Back
          </button>
        </div>
      </nav>

      {/* Content Area with Responsive Padding and Sizing */}
      <div className="pt-16 sm:pt-20 px-2 sm:px-4 md:px-6 min-h-screen">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center">
            <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8">
              <AddFoodForm />
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Scripts with Responsive Positioning */}
      <div className="fixed bottom-4 right-4 z-20">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.embeddedChatbotConfig = {
                chatbotid: "bDDi7MMWsEWiXzWeDh5Oz",
                domain: "www.chatbase.co"
              }
            `,
          }}
        />
        <script
          src="https://www.chatbase.co/embed.min.js"
          chatbotid="bDDi7MMWsEWiXzWeDh5Oz"
          domain="www.chatbase.co"
          defer
        />
      </div>
    </div>
  );
}