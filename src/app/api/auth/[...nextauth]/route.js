import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, 
  pages: {
    signIn: '/sign', // Custom sign-in page
    error: '/error',    // Custom error page
    signOut: '/logout', // Custom sign-out page
  }, // Ensure this is set for session security
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
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Session expiration: 30 days
  },
  };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
