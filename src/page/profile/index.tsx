import { useState } from "react";
import { Input, Button, Form, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    ism: "Alisher",
    familiya: "Sharipov",
    email: "alishersharipov670@gmail.com",
    telefon: "998953901313",
    rol: "Admin",
  });

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // URLga request yuborish
      await axios.post("/api/update-profile", values);
      setProfile(values);
      message.success("O'zgartirishlar saqlandi");
      setIsEditing(false);
    } catch (error) {
      message.error("Xatolik yuz berdi" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Akkountni o‘chirishni istaysizmi?",
      okText: "Ha, o‘chirilsin",
      okType: "danger",
      cancelText: "Bekor qilish",
      async onOk() {
        try {
          await axios.post("/api/delete-account", { email: profile.email });
          message.success("Akkount o‘chirildi");
        } catch (err) {
          message.error("O‘chirishda xatolik yuz berdi" + err);
        }
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl mx-auto mt-[150px]">
      <h1 className="text-2xl font-bold mb-4">Mening profilim</h1>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex gap-10">
            <div className="w-[90px] h-[90px] rounded-[100%] border border-gray-300 flex items-center justify-center text-gray-400">
              +Profile
            </div>
            <div className="flex ">
              <div className="flex flex-col gap-[15px]">
                 <div><b>Ism:</b><br /> {profile.ism}</div>
                <div><b>Familiya:</b> <br />{profile.familiya}</div>
                <div><b>Elektron pochta:</b> <br /> {profile.email}</div>
              </div>
              <div className="flex flex-col gap-[15px]">
                     <div><b>Rol:</b> <br />{profile.rol}</div>
                    <div><b>Telefon:</b><br /> {profile.telefon}</div>
                </div>
            </div>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
            >
              Profilni tahrirlash
            </Button>
          </div>

          <Button
            type="default"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
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
          <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center text-gray-400">
            +Profile
          </div>
          <Form.Item label="Ism" name="ism" rules={[{ required: true, message: "Ism kiriting" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Familiya" name="familiya" rules={[{ required: true, message: "Familiya kiriting" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Elektron pochta" name="email">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Telefon" name="telefon">
            <Input />
          </Form.Item>
          <Form.Item label="Rol" name="rol">
            <Input disabled />
          </Form.Item>

          <div className="col-span-2 flex gap-4 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleSave}
            >
              O‘zgartirishlarni saqlash
            </Button>
            <Button
              danger
              onClick={() => setIsEditing(false)}
            >
              Bekor qilish
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Profile;
