import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

import { nextAuthOptions } from '../api/auth/[...nextauth]/route'

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  console.log('🚀 ~ PrivateLayout ~ session:', session)

  if (session) {
    redirect('/dashboard')
  }

  return <>{children}</>
}
