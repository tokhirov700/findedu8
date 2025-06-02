import { useMenu } from '@/store/isMenu'
import { Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import MenuBar from './menuModal'
import { useTheme } from '@/store/useThem'
import { isUser } from '@/store/user'
import ProfileMenu from '../../../components/profil-menu'

const Header = () => {
  const [lang, setLang] = useState<string>('uz')
  const { t, i18n } = useTranslation()
  const { toggleMenu } = useMenu()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const {MyUser} = isUser()

  const changeLang = (lang: string) => {
    setLang(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <header className="w-full overflow-x-hidden">
      <nav className="w-full z-40 fixed top-0 shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-white dark:bg-gray-900">
        <div className="w-full mx-auto flex justify-between items-center px-4 md:px-10 h-[80px]">
          {/* Logo */}
          <div className="logo w-[140px] h-full flex items-center justify-center font-bold text-2xl text-[#1E40AF] dark:text-white select-none cursor-pointer">
            <Link to={'/'}>
              <span className="tracking-widest uppercase">
                Find<span className="text-[#2563EB]">Edu</span>.uz
              </span>
            </Link>
          </div>

          {/* Navigation links - hidden on small screens */}
          <ul className="hidden md:flex gap-8 text-[#1E40AF] dark:text-white font-semibold text-lg select-none">
            <li>
              <Link to="/" className="hover:text-[#2563EB] transition">
                {t('Bosh sahifa')}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#2563EB] transition">
                {t('Biz haqimizda')}
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-[#2563EB] transition">
                {t('Resurslar')}
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-[#2563EB] transition">
                {t('Sevimlilar')}
              </Link>
            </li>
            <li>
              <Link to="/reseptions" className="hover:text-[#2563EB] transition">
                Navbatlar
              </Link>
            </li>
            {
              MyUser?.role == "CEO" ? <li>
              <Link to="/ceo" className="hover:text-[#2563EB] transition">
                  CEO
              </Link>
            </li>
            :
            ''
            }
          </ul>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {isDark ? (
                <Sun className="text-[#1E40AF] w-6 h-6" />
              ) : (
                <Moon className="text-[#1E40AF] w-6 h-6" />
              )}
            </button>

            {/* Hamburger menu for mobile */}
            <div
              className="block md:hidden cursor-pointer p-2 rounded-md hover:text-[#1E40AF] transition"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <Menu className="text-[#1E40AF] w-6 h-6" />
            </div>

            {/* Language selector */}
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value)}
              className="hidden md:block text-[#1E40AF] dark:text-white bg-transparent border border-[#1E40AF] rounded-md px-2 py-1 cursor-pointer"
              aria-label="Select Language"
            >
              <option value="uz">Uz</option>
              <option value="ru">Ru</option>
              <option value="en">En</option>
            </select>

            

           {
              MyUser?.id ? <ProfileMenu /> : <div className='flex gap-[10px]'>
                 <button
              className="relative overflow-hidden px-6 py-2 rounded-xl text-[#1E40AF] border border-[#1E40AF] font-semibold bg-transparent group transition-colors duration-300 cursor-pointer hidden md:block"
              onClick={() => navigate('/login')}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {t('Login')}
              </span>
              <span className="absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0 pointer-events-none">
                <svg className="absolute inset-0 w-[200%] h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                  <path
                    d="M0,10 C150,40 350,0 500,20 C650,40 850,0 1200,10 L1200,100 L0,100 Z"
                    fill="#1E40AF"
                    style={{ opacity: 0.6, animation: 'wave1 12s linear infinite' }}
                  />
                  <path
                    d="M0,20 C250,0 450,40 700,10 C950,40 1050,20 1200,20 L1200,100 L0,100 Z"
                    fill="#1E40AF"
                    style={{ opacity: 0.4, animation: 'wave2 10s linear infinite' }}
                  />
                  <path
                    d="M0,40 C350,10 450,40 650,30 C850,20 950,50 1200,40 L1200,100 L0,100 Z"
                    fill="#1E40AF"
                    style={{ opacity: 0.8, animation: 'wave3 8s linear infinite' }}
                  />
                </svg>
              </span>
                 </button>

                  <button
                    className="relative overflow-hidden px-6 py-2 rounded-xl text-white bg-[#1E40AF] border border-[#1E40AF] font-semibold group transition-colors duration-300 cursor-pointer hidden md:block"
                    onClick={() => navigate('/register')}
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#1E40AF]">
                      {t('Register')}
                    </span>
                    <span className="absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0 pointer-events-none">
                      <svg className="absolute inset-0 w-[200%] h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
                        <path
                          d="M0,10 C150,40 350,0 500,20 C650,40 850,0 1200,10 L1200,100 L0,100 Z"
                          fill="#ffffff"
                          style={{ opacity: 0.6, animation: 'wave1 12s linear infinite' }}
                        />
                        <path
                          d="M0,20 C250,0 450,40 700,10 C950,40 1050,20 1200,20 L1200,100 L0,100 Z"
                          fill="#ffffff"
                          style={{ opacity: 0.4, animation: 'wave2 10s linear infinite' }}
                        />
                        <path
                          d="M0,40 C350,10 450,40 650,30 C850,20 950,50 1200,40 L1200,100 L0,100 Z"
                          fill="#ffffff"
                          style={{ opacity: 0.8, animation: 'wave3 8s linear infinite' }}
                        />
                      </svg>
                    </span>
                  </button>
              </div>

           }

           
          </div>
        </div>
      </nav>
      <MenuBar />
    </header>
  )
}

export default Header
