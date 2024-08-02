import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import api from '@/api'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        identifier: { label: 'credential', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const response = await api.post('auth/local', {
          identifier: credentials?.identifier,
          password: credentials?.password,
        })

        api.defaults.headers.Authorization = `Bearer ${response.data.jwt}`
        const user = await response.data.user

        const userTest = await api.get(`users/${user.id}?populate=*`)

        console.log('🚀 ~ authorize ~ userTest:', userTest.data)
        if (user && response.statusText === 'OK') {
          return user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
