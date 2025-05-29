import { Form, Input, Select, Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import http from "@/config";
import { useNotification } from "@/store/useNotification";
import type { region } from "@/store/isRegion";
import { isCenters, type CenterData } from "@/store/isCenters";
import { isUser } from "@/store/user";
import "./style.css";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Dragger } = Upload;

interface Props {
  regions: region[];
  centers: CenterData[];
}

const BranchForm = ({ regions, centers }: Props) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const { setNotification } = useNotification();
  const { MyUser } = isUser();
  const {getCenters} = isCenters()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", values.image[0].originFileObj);

      const uploadRes = await http.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageName = uploadRes.data.data;

      const payload = {
        centerId: values.centerId,
        name: values.name,
        phone: "+998" + values.phone,
        regionId: values.regionId,
        address: values.address,
        image: uploadedImageName,
      };

      await http.post("/filials", payload);
      setNotification("Filial muvaffaqiyatli qo'shildi", "success");
      getCenters()
      form.resetFields();
    } catch (error) {
      console.error(error);
      setNotification("Filial yaratishda xatolik yuz berdi", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-purple-800 mb-6">
        Add Branch
      </h1>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Markazni tanlang"
          name="centerId"
          rules={[{ required: true }]}
        >
          <Select placeholder="Markazni tanlang">
            {centers.map((center) =>
              center.seoId == MyUser?.id ? (
                <Option key={center.id} value={center.id}>
                  {center.name}
                </Option>
              ) : (
                ""
              )
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Filial nomi" name="name" rules={[{ required: true }]}>
          <Input placeholder="Filial nomi" />
        </Form.Item>

        <Form.Item
          label="Telefon raqami"
          name="phone"
          rules={[{ required: true, len: 9 }]}
        >
          <Input addonBefore="+998" placeholder="901234567" />
        </Form.Item>

        <Form.Item label="Hudud" name="regionId" rules={[{ required: true }]}>
          <Select placeholder="Select Region">
            {regions.map((r) => (
              <Option key={r.id} value={r.id}>
                {r.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Manzil" name="address" rules={[{ required: true }]}>
          <Input placeholder="Manzilni kiriting" />
        </Form.Item>

        <Form.Item
          label="Filial rasmi"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Filial rasmi talab qilinadi" }]}
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
              Yuklash uchun bosing yoki faylni sudrab keltiring
            </p>
            <p className="ant-upload-hint text-sm text-gray-500">
              PNG yoki JPG fayllar, maksimal 5MB
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={uploading}
            className="w-full addCenterBtn"
          >
            Filial qo'shish
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-10 text-center mb-[10px] text-purple-700 font-semibold text-lg">
        Sizning filiallaringiz:
      </div>

      {
        centers.map((e, i) => {
          return e.seoId == MyUser?.id ?  <div
        onClick={() => navigate(`/branches/${e.id}`)}
        className="py-[8px] px-[15px] mb-[10px] cursor-pointer transition-all  hover:bg-[#ead7ff] bg-[#F3E8FF] border-[#D8B4FE] border-[1px] rounded-[12px]"
        key={i}
      >
        <h4 className="font-semibold text-[17px] mb-[-5px]">{e?.name}</h4>
        <p className="text-[#000000a6] text-[14px]">{e?.address}</p>
      </div>
      :
      ''
        })
      }
    </div>
  );
};

export default BranchForm;
