import { Form, Input, Select, Upload, Checkbox, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { region } from "@/store/isRegion";
import type { majordata } from "@/store/isMajors";
import http from "@/config";
import { useNotification } from "@/store/useNotification";
import { isCenters } from "@/store/isCenters";
import './style.css'
import CenterCard from "../centerCard";
import { isUser } from "@/store/user";

const { Option } = Select;
const { Dragger } = Upload;


interface props{
  region: region[]
  major: majordata[]
}

const CenterForm = (props:props) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const {setNotification} = useNotification()
  const {getCenters, isCenterData} = isCenters()
  const {MyUser} = isUser()

  const onFinish = async (values:any) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", values.image[0].originFileObj);

      const uploadRes = await http.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageName = uploadRes.data.data;

      const payload = {
        name: values.centerName,
        regionId: values.regionId,
        address: values.address,
        image: uploadedImageName,
        majorsId: values.directions,
        phone: "+998" + values.phone,
      };

      await http.post("/centers", payload);
      getCenters()
      setNotification("O'quv markazi yaratildi", 'success')

      form.resetFields();
    } catch (error) {
      console.error(error);
      setNotification("O'quv markazi yaratishda xatolik", 'error')
      
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-center text-purple-800 mb-6">
              O'quv Markaz Yaratish
            </h1>

            <Form form={form} onFinish={onFinish} layout="vertical">
              <Form.Item label="Markaz nomi" name="centerName" rules={[{ required: true }]}>
                <Input placeholder="Enter center name" />
              </Form.Item>

              <Form.Item label="Hudud" name="regionId" rules={[{ required: true }]}>
                <Select placeholder="Select Region">
                    {
                      props?.region.map((e, i) => {
                        return  <Option key={i} value={e.id}>{e.name}</Option>
                      })
                    }
                  {/* Qo‘shimcha regionlar */}
                </Select>
              </Form.Item>

              <Form.Item label="Manzil" name="address" rules={[{ required: true }]}>
                <Input placeholder="Manzilni kiriting" />
              </Form.Item>

              <Form.Item
                label="Markaz rasmi"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[{ required: true, message: "Rasm yuklang" }]}
              >
                <Dragger
                  name="image"
                  maxCount={1}
                  beforeUpload={() => false}
                  accept=".png,.jpg,.jpeg"
                >
                  <p className="ant-upload-drag-icon text-purple-600">
                    <InboxOutlined className="text-3xl" />
                  </p>
                  <p className="ant-upload-text font-medium">
                    Yuklash uchun bosing yoki faylni bu yerga tortib tushiring
                  </p>
                  <p className="ant-upload-hint text-sm text-gray-500">
                    Faqat bitta PNG yoki JPG ruxsat etiladi (5MB gacha)
                  </p>
                </Dragger>
              </Form.Item>

              <Form.Item label="Telefon raqami" name="phone" rules={[{ required: true, max:9 }]}>
                <Input addonBefore="+998" placeholder="901234567" />
              </Form.Item>

              <Form.Item
                label="Yo'nalishlar (kamida bittasini tanlang)"
                name="directions"
                rules={[{ required: true, message: "Kamida bitta yo'nalishni tanlang" }]}
              >
                <Checkbox.Group>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {props.major.map((item) => (
                      <Checkbox key={item.id} value={item.id}>
                        {item.name}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={uploading}
                  className="w-full addCenterBtn"
                >
                  Markaz qo'shish
                </Button>
              </Form.Item>
            </Form>
          </div>
          

          
      <div className="mt-10 text-center mb-[20px] text-purple-700 font-semibold text-[30px]">
        Sizning markazlaringiz:
      </div>
          <div className="container flex flex-wrap gap-x-[33px] gap-y-[40px] filialsdata px-[10px]">
                {
                  isCenterData.map((e,i ) => {
                    return e.seoId == MyUser?.id ?
                    <CenterCard data={e} key={i}/>
                    :
                    ''
                  })
                }
          </div>
    </div>
  );
};

export default CenterForm;
