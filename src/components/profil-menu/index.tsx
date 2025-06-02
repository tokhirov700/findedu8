import { Dropdown, Menu, Avatar } from 'antd';
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { isUser } from '@/store/user';
import { removeCookies } from '@/utils/cocies';

const ProfileDropdown = () => {
  const { MyUser } = isUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookies('access_token')
    removeCookies('refresh_token')
    console.log("User logged out");
    // masalan: removeCookies('access_token') va redirect
    navigate('/login');
  };

  const menu = (
    <Menu>
      <Menu.Item key="username" disabled>
        <div className="font-semibold">{MyUser?.firstName} {MyUser?.lastName}</div>
        <div className="text-xs text-gray-500">{MyUser?.email}</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="edit" onClick={() => navigate('/profile')} icon={<EditOutlined />}>
        Profilni tahrirlash
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />} danger>
        Chiqish
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['hover']}>
      <div className="flex items-center gap-2 cursor-pointer max-sm:hidden px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition">
        <Avatar size="small" style={{ backgroundColor: '#1E40AF' }}>
          {MyUser?.firstName?.charAt(0)} {MyUser?.lastName}
        </Avatar>
        <span className="font-medium text-[#1E40AF] dark:text-white">{MyUser?.firstName} {MyUser?.lastName}</span>
      </div>
    </Dropdown>
  );
};

export default ProfileDropdown;
