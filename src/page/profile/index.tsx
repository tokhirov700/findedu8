import { useEffect, useState } from "react";
import { Input, Button, Form, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import './style.css'
import { isUser } from "@/store/user";
import http from "@/config";
import { useNotification } from "@/store/useNotification";
import { useNavigate } from "react-router-dom";
import { removeCookies } from "@/utils/cocies";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const {MyUser, getMyUser} = isUser()
  const {setNotification} = useNotification()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    firstName: MyUser?.firstName,
    lastName: MyUser?.lastName,
    email: MyUser?.email,
    phone: MyUser?.phone,
    role: MyUser?.role,
  });

  useEffect(() => {
    setProfile({
        firstName: MyUser?.firstName,
        lastName: MyUser?.lastName,
        email: MyUser?.email,
        phone: MyUser?.phone,
        role: MyUser?.role,
    })
  }, [MyUser?.email, MyUser?.firstName, MyUser?.lastName, MyUser?.phone,  MyUser?.role])

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setProfile(values);
      values.phone = values.phone.split('+')[1]
      delete values.email
      delete values.role

      setLoading(true);
      await http.patch(`/users/${MyUser?.id}`, values);
      setIsEditing(false);
      setNotification("Profil o'zgartirildi", 'success')
      getMyUser()
    } catch (error:any) {
      message.error("Xatolik yuz berdi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await http.delete(`/users/${MyUser?.id}`)
      setNotification("Akkaunt o'chirildi", 'success')
      removeCookies('access_token')
      removeCookies('refresh_token')
      setTimeout(() => {
              navigate('/')
      }, 1000);
    } catch (err:any) {
      setNotification("Akkaunt o'chirishda muammo" + err.message, 'error')
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto mt-32 w-full">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Mening profilim</h1>

      {!isEditing ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              +Profile
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Ism</p>
                <p className="font-medium">{profile.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Familiya</p>
                <p className="font-medium">{profile.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Elektron pochta</p>
                <p className="font-medium break-all">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <p className="font-medium">{profile.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rol</p>
                <p className="font-medium">{profile.role}</p>
              </div>
            </div>

            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              className="save"
            >
              Tahrirlash
            </Button>
          </div>

          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={() => setDeleteModalVisible(true)}
          >
            Akkauntni o‘chirish
          </Button>
        </div>
      ) : (
        <Form
          form={form}
          initialValues={profile}
          layout="vertical"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 text-sm">
            +Profile
          </div>

          <Form.Item
            label="Ism"
            name="firstName"
            rules={[{ required: true, message: "Ism kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Familiya"
            name="lastName"
            rules={[{ required: true, message: "Familiya kiriting" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Elektron pochta" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Telefon" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Rol" name="role">
            <Input disabled />
          </Form.Item>

          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleSave}
              className="save"
            >
              Saqlash
            </Button>
            <Button danger onClick={() => setIsEditing(false)}>
              Bekor qilish
            </Button>
          </div>
        </Form>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        title="Akkountni o‘chirishni istaysizmi?"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Ha, o‘chirilsin"
        cancelText="Bekor qilish"
        okButtonProps={{ danger: true }}
      >
        <p>Ushbu amalni bekor qilib bo‘lmaydi. Davom etishni xohlaysizmi?</p>
      </Modal>
    </div>
  );
};

export default Profile;
