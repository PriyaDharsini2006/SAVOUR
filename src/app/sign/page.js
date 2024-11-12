'use client';

import { signIn, useSession } from 'next-auth/react';
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
      className="flex flex-col items-center justify-center min-h-screen text-white p-4 sm:p-6 md:p-8"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('pexels-jari-lobo-456989711-19071342.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white bg-opacity-30 backdrop-blur-sm shadow-lg rounded-lg p-6 sm:p-8 md:p-12 lg:p-16 text-center w-full max-w-md mx-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6">
          Welcome Back
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-6 sm:mb-8">
          Sign in to access your account and manage your profile.
        </p>
        {status !== 'loading' && !session ? (
          <button
            onClick={handleClick}
            className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-200 shadow-md text-sm sm:text-base"
          >
            Sign In with Google
          </button>
        ) : (
          <p className="text-gray-700 text-base sm:text-lg">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default SignInPage;