import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import api from '@/api'

type AuthContextType = {
  login: (identifier: string, password: string) => void
  loading: boolean
  logout: () => void
  user: any
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  // useEffect(() => {
  //   // Verifique se o usuário está autenticado quando o componente é montado
  //   const token = Cookies.get('next-auth.session-token');
  //   if (token) {
  //     console.log('entrou');

  //     api.defaults.headers.Authorization = `Bearer ${token}`;
  //     api.get('users/me')
  //       .then(response => {
  //         console.log("🚀 ~ useEffect ~ response:", response)
  //         setUser(response.data);
  //       })
  //       .catch(() => {
  //         setUser(null);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   } else {
  //     console.log('erro token');

  //     setLoading(false);
  //   }
  // }, []);

  const login = async (identifier: string, password: string) => {
    setLoading(true)
    try {
      const response = await api.post('auth/local', {
        identifier,
        password,
      })
      setUser(response.data.user)
      if (response.statusText) {
        router.push('/')
      }
    } catch (error) {
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    delete api.defaults.headers.Authorization
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
