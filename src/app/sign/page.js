
'use client';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/page');
    }
  }, [status, router]);

  const handleClick = async () => {
    if (!session) {
      const result = await signIn('google', { callbackUrl: '/page' });
      if (result?.ok) {
        router.push('/page');
      }
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-white p-8" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('pexels-jari-lobo-456989711-19071342.jpg')",
        // backgroundImage: "url('pexels-jari-lobo-456989711-19071342.jpg')",
        backgroundSize: 'fit',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
         
      }}
    >
      <div className="bg-white bg-opacity-30 shadow-lg rounded-lg p-20 text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-black mb-6">Welcome Back</h1>
        <p className="text-2xl text-black mb-9">Sign in to access your account and manage your profile.</p>
        {status !== 'loading' && !session ? (
          <button 
            onClick={handleClick} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md"
          >
            Sign In with Google
          </button>
        ) : (
          <p className="text-gray-700">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
