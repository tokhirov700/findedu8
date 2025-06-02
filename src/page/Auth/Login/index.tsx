import { useNotification } from '@/store/useNotification'
import { setCookies } from '@/utils/cocies'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setNotification } = useNotification()
  const navigate = useNavigate()

  type LoginResponse = {
    accessToken: string,
    refreshToken: string
  }

  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('https://findcourse.net.uz/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data: LoginResponse = await response.json()

    if(data?.accessToken){
        setNotification("Kirishga ruhsat etildi", 'success')
        setCookies("access_token", data.accessToken)
        setCookies("refresh_token", data.refreshToken)
        navigate('/')
    }else{
      setNotification("Kirishda xatolik mavjud", 'error')
    }
  }

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 flex flex-col gap-6"
        onSubmit={LoginSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-[#3B82F6] dark:text-blue-400">
            Accauntga kirish
        </h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#3B82F6] text-gray-800 dark:text-white dark:bg-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#3B82F6] text-gray-800 dark:text-white dark:bg-gray-700"
        />

       
        <button
          type="submit"
          className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-md transition duration-300"
        >
          Accatunga kirish
        </button>

         <Link to='/register' className='text-center text-blue-700'>Akkauntingiz yo'qmi ?</Link>
      </form>
    </section>
  )
}

export default Register
