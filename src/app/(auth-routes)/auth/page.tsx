'use client'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Auth() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleLogin() {
    const res = await signIn('credentials', {
      identifier: username,
      password,
      redirect: false,
    })

    if (res?.error) {
      console.log(res)
      return
    }

    router.replace('/dashboard')
  }

  return (
    <div className="h-screen flex w-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="Digite seu e-mail"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Senha</Label>
                <Input
                  id="name"
                  placeholder="Digite sua senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => handleLogin()}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
