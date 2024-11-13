import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,  // Ensure this is set for session security
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, 
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
    signIn: '/signin', // Custom sign-in page
    error: '/error',    // Custom error page
    signOut: '/signout', // Custom sign-out page
  },};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
