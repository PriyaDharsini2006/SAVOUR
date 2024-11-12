// 'use client';
// import React from 'react';
// import Link from 'next/link';
// import { signOut, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect,useState } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// const Home = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [showDropdown, setShowDropdown] = useState(false);
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/sign');
//     }
//   }, [status, router]);


//   const handleSignOut = async () => {
//     try {
//       await signOut({ 
//         redirect: false,
//         callbackUrl: '/sign'
//       });
//       router.push('/sign');
//     } catch (error) {
//       console.error('Sign out error:', error);
//     }
//   };

//   if (status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!session) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
//       {/* Navbar */}
//       <nav className="bg-white bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg fixed w-full top-0 left-0 z-10">
//         <div className="flex items-center justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <h1 className="text-2xl font-bold  text-white  ">SAVOUR</h1>
//           {/* Sign Out Button */}
          
         
//             {/* Profile Icon */}
            
// <div className='flex justify-between max-w-4xl  px-20  gap-5 lg:px-7 items-center '>
          
          

//           <div className="relative">
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="flex items-center text-white hover:text-gray-300 focus:outline-none"
//               >
//                 <FaUserCircle className="text-5xl" /> {/* User icon */}
//               </button>
//               {showDropdown && (
//                 <div className="absolute bg-white bg-gradient-to-r bg-indigo-700  right-0 mt-5 gap-48 w-96 bg-white border rounded-lg shadow-lg p-4 text-center">
//                   <p className="text-white text-lg mt-2 font-bold">Hello , {session.user.email}

//                   </p>
//                   <button
//             onClick={handleSignOut}
//             className="bg-white mt-6 text-blue-600 hover:bg-gray-300 font-medium py-2 px-10 rounded-lg border-2 border-blue-600 transition duration-300"
//           >
//             Sign Out
//           </button>
//                 </div>
//               )}
//             </div>
//             </div>
//         </div>
//       </nav>

//       {/* Background Image with Overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//         backgroundImage: "linear-gradient(rgba(0, 0, 0.3, 0.3), rgba(0, 0, 0.5, 0.4)), url('pexels-jj-jordan-44924743-9507469.jpg')",
//         // backgroundImage: "url('pexels-jari-lobo-456989711-19071342.jpg')",
//         backgroundSize: 'fit',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
        
         
//       }}
//       >
//         <div className="absolute inset-0 bg-black opacity-30"></div>
//       </div>

//       {/* Main Content */}
//       <div className="bg-opacity-85 shadow-1xl rounded-full p-20 mt-20 fixed max-w-11xl w-full relative z-20">
//         {/* Header Section */}
//         <header className="text-center mb-20">
//           <h1 className="text-6xl font-serif font-bold text-white mb-4">Food Excess</h1>
//           <p className="text-2xl py-5 text-white">
//             Join us in the fight against food waste. Manage surplus food, prevent
//             it from going to waste, and help those in need.
//           </p>
//         </header>

//         {/* Info Section */}
//         <section className="text-center mb-0">
//           <h2 className="text-5xl font-serif   font-semibold text-white mb-4">How It Works</h2>
//           <p className="text-2xl text-white mb-4">
//             This platform connects those with surplus food to people or
//             organizations who can put it to good use. If you have extra food, you
//             can donate it and ensure it reaches those who need it the most.
//           </p>
//           <p className="text-4xl py-4 font-serif font-semibold text-white">Choose your role below to get started:</p>
//         </section>

//         {/* Call-to-action Buttons */}
//         <div className="flex mt-4 justify-center space-x-9">
//           {/* Button to Donate Food */}
//           <Link href="/user">
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 px-9 rounded-lg shadow transition-colors duration-300">
//               I'm Ready to Donate
//             </button>
//           </Link>

//           {/* Button to Receive Food */}
//           <Link href="/provider">
//             <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-5 px-9 rounded-lg shadow transition-colors duration-300">
//               I Need Food Provisions
//             </button>
//           </Link>
//         </div>

//         {/* Footer Section */}
//         <footer className="mt-10 text-center text-xl text-white">
//           Together, we can make a difference and reduce food waste. Thank you for
//           being part of the change.
//         </footer>
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
// };

// export default Home;

'use client';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: false,
        callbackUrl: '/sign'
      });
      router.push('/sign');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg fixed w-full top-0 left-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-white">SAVOUR</h1>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center text-white hover:text-gray-300 focus:outline-none"
            >
              <FaUserCircle className="text-3xl sm:text-4xl lg:text-5xl" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-5 w-48 sm:w-64 md:w-80 lg:w-96 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-4 text-center">
                <p className="text-white text-sm sm:text-base lg:text-lg font-bold break-words">
                  Hello, {session.user.email}
                </p>
                <button
                  onClick={handleSignOut}
                  className="bg-white mt-4 text-blue-600 hover:bg-gray-300 font-medium text-sm sm:text-base py-2 px-6 sm:px-8 rounded-lg border-2 border-white transition duration-300 w-full sm:w-auto"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Container with Scroll */}
      <div className="relative min-h-screen overflow-y-auto">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('pexels-jj-jordan-44924743-9507469.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Scrollable Content */}
        <div className="relative min-h-screen">
          {/* Content Padding for Navbar */}
          <div className="pt-16 sm:pt-20">
            {/* Main Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {/* Header Section */}
              <header className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 sm:mb-4">
                  Food Excess
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl text-white max-w-3xl mx-auto">
                  Join us in the fight against food waste. Manage surplus food, prevent
                  it from going to waste, and help those in need.
                </p>
              </header>

              {/* Info Section */}
              <section className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-3 sm:mb-4">
                  How It Works
                </h2>
                <p className="text-base sm:text-lg lg:text-2xl text-white mb-4 max-w-3xl mx-auto">
                  This platform connects those with surplus food to people or
                  organizations who can put it to good use. If you have extra food, you
                  can donate it and ensure it reaches those who need it the most.
                </p>
                <p className="text-xl sm:text-2xl lg:text-4xl font-serif font-semibold text-white">
                  Choose your role below to get started:
                </p>
              </section>

              {/* Call-to-action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-9">
                <Link href="/user">
                  <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-9 rounded-lg shadow transition-colors duration-300 text-sm sm:text-base">
                    I'm Ready to Donate
                  </button>
                </Link>

                <Link href="/provider">
                  <button className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-9 rounded-lg shadow transition-colors duration-300 text-sm sm:text-base">
                    I Need Food Provisions
                  </button>
                </Link>
              </div>

              {/* Footer Section */}
              <footer className="mt-8 sm:mt-10 text-center text-sm sm:text-base lg:text-xl text-white max-w-2xl mx-auto">
                Together, we can make a difference and reduce food waste. Thank you for
                being part of the change.
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Scripts */}
      <div className="fixed bottom-4 right-4 z-50">
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
};

export default Home;