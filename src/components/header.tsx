import { Cake, Clock8, Home, SquareGanttChart } from 'lucide-react'
import Link from 'next/link'

import { AccountMenu } from './account-menu'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Cake className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/dashboard" className="flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
          <Link href="/orders" className="flex items-center justify-center">
            <SquareGanttChart className="mr-2 h-4 w-4" />
            Histórico
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
