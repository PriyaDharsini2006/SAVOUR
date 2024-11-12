import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          redirect_uri: 'https://savour-one.vercel.app/api/auth/callback/google',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,  // Ensure this is set for session security
  session: {
    strategy: 'jwt',
  },
  callbacks: {
  
    async session({ session, token }) {
      // You can add user information to the session object here if needed
      session.user.id = token.sub;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    error: '/auth/error',    // Custom error page
    signOut: '/auth/signout', // Custom sign-out page
  },};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
