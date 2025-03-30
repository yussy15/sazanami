import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: "0TyTuCiRKZO2sDMv2fGPnRRKcu1CDMnojKxRQWSFss4=",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const domain = user.email?.split('@')[1];
      return domain === process.env.AUTHORIZED_DOMAIN;
    },
  },
});
