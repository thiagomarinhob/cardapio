import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { Header } from '@/components/header'

interface PrivateLayoutProps {
  children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions)
  console.log("🚀 ~ PrivateLayout ~ session:", session)

  if (!session) {
    redirect('/auth')
  }

  return <html lang='pt-BR'>
    <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased'
        )}
      >
        <div className="flex min-h-screen flex-col antialiased">
          <Header />
          
          <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
            {children}
          </div>
        </div>
      </body>
    </html>
}
