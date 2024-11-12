'use client';  // Mark this as a client-side component
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut,signIn } from 'next-auth/react';
import Sign from './sign/page';
const Page = () => {
  return (
    <div>
      <Sign />
    </div>
  );
};

export default Page;
