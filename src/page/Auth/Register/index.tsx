import { useEmailOtpStore } from '@/store/EmailForOtp'
import { useNotification } from '@/store/useNotification'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { t } = useTranslation()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [role, setRole] = useState<string>('USER')
  const navigate = useNavigate()
  const { setEmailOtp } = useEmailOtpStore()
  const { setNotification } = useNotification()

  type RegisterResponse = {
    message: string
  }

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('https://findcourse.net.uz/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
        image: '/avatar.jpg',
      }),
    })
    const data: RegisterResponse = await response.json()
    console.log(data?.message)

    if (response.ok) {
      setNotification(data?.message, 'success')
      setEmailOtp(email)
      setTimeout(() => {
        navigate('/otp')
      }, 1500)
    } else {
      setNotification(data?.message, 'error')
    }
  }

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 flex flex-col gap-6"
        onSubmit={registerSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-[#3B82F6] dark:text-blue-400">
          {t('Hisob yaratish')}
        </h1>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#3B82F6] text-gray-800 dark:text-white dark:bg-gray-700"
          />
          <input
            type="text"
            placeholder="SurName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#3B82F6] text-gray-800 dark:text-white dark:bg-gray-700"
          />
        </div>

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

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#3B82F6] text-gray-800 dark:text-white dark:bg-gray-700"
        />

        <select
          className="w-full px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none focus:border-[#3B82F6] text-gray-800 dark:text-white dark:bg-gray-700"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="CEO">CEO</option>
        </select>

        <input
          type="file"
          className="w-full px-4 py-2 border-2 border-[#CBD5E1] rounded-md focus:outline-none text-gray-800 dark:text-white dark:bg-gray-700"
        />

        <button
          type="submit"
          className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-md transition duration-300"
        >
          {t('Register')}
        </button>
      </form>
    </section>
  )
}

export default Register
