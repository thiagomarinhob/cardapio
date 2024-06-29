import api from "@/api";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: 'credential', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials, req) {
        const response = await api.post('auth/local', { identifier: credentials?.identifier, password: credentials?.password });

        const user = await response.data.user;

        if (user && response.statusText === 'OK') {
          return user
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/auth',
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }