import { useMenu } from '@/store/isMenu';
import { isUser } from '@/store/user';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Menu, Avatar, Drawer, Button } from 'antd';
import { removeCookies } from '@/utils/cocies';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';

const MenuBar = () => {
  const { isOpen, toggleMenu } = useMenu();
  const { MyUser } = isUser();
  const [lang, setLang] = useState<string>('uz');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookies('access_token');
    removeCookies('refresh_token');
    console.log('User logged out');
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="username" disabled>
        <div className="font-semibold">{MyUser?.firstName} {MyUser?.lastName}</div>
        <div className="text-xs text-gray-500">{MyUser?.email}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="edit" onClick={() => navigate('/profile')} icon={<EditOutlined />}>
        {t('Edit Profile')}
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />} danger>
        {t('Logout')}
      </Menu.Item>
    </Menu>
  );

  const changeLang = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <Drawer
      title={
        <select
          value={lang}
          onChange={(e) => changeLang(e.target.value)}
          className="dark:bg-[#D56A42] px-4 py-2 rounded-lg text-black font-medium"
        >
          <option value="uz" className="dark:text-black">Uz</option>
          <option value="ru" className="dark:text-black">Ru</option>
          <option value="en" className="dark:text-black">En</option>
        </select>
      }
      placement="right"
      onClose={toggleMenu}
      open={isOpen}
      width={300}
      className="dark:bg-black"
    >
      <ul className="flex flex-col text-[#1E40AF] gap-6 dark:text-white font-semibold text-lg select-none">
        <li>
          <Link to="/" onClick={toggleMenu} className="hover:text-[#2563EB] transition">
            {t('Bosh sahifa')}
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleMenu} className="hover:text-[#2563EB] transition">
            {t('Biz haqimizda')}
          </Link>
        </li>
        <li>
          <Link to="/resources" onClick={toggleMenu} className="hover:text-[#2563EB] transition">
            {t('Resurslar')}
          </Link>
        </li>
        <li>
          <Link to="/favorites" onClick={toggleMenu} className="hover:text-[#2563EB] transition">
            {t('Sevimlilar')}
          </Link>
        </li>
         <li>
          <Link to="/reseptions" onClick={toggleMenu} className="hover:text-[#2563EB] transition">
            Navbatlar
          </Link>
        </li>
        {MyUser?.role === 'CEO' && (
          <li>
            <Link to="/ceo" onClick={toggleMenu} className="hover:text-[#2563EB] transition">
              CEO
            </Link>
          </li>
        )}
      </ul>

      <div className="flex flex-col gap-4 mt-10">
        {MyUser?.id ? (
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div className="flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              <Avatar size="small" style={{ backgroundColor: '#1E40AF' }}>
                {MyUser?.firstName?.charAt(0)}
              </Avatar>
              <span className="text-[#1E40AF] dark:text-white font-medium">
                {MyUser?.firstName} {MyUser?.lastName}
              </span>
            </div>
          </Dropdown>
        ) : (
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                navigate('/login');
                toggleMenu();
              }}
              className="text-[#1E40AF] border-[#1E40AF]"
              block
            >
              {t('Login')}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                navigate('/register');
                toggleMenu();
              }}
              className="bg-[#1E40AF]"
              block
            >
              {t('Register')}
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default MenuBar;
