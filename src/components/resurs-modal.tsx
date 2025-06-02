import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import http from "@/config";

const { Option } = Select;

const ResursModal = ({ open, onClose, category = [], getResources }: any) => {
  const [form] = Form.useForm();
  const [imageType, setImageType] = useState<"url" | "file">("url");

  const handleSubmit = async (values: any) => {
    try {
      // const formData = new FormData();
      // formData.append("categoryId", values.categoryId);
      // formData.append("name", values.name);
      // formData.append("description", values.description);
      // formData.append("media", values.media);

      // if (imageType === "url") {
      //   formData.append("image", values.image_url);
      // } else if (values.image_file?.file) {
      //   formData.append("image", values.image_file.file);
      // }

      await http.post("/resources", values);
      message.success("Resurs muvaffaqiyatli qo‘shildi!");
      form.resetFields();
      onClose();
      getResources(); // listni yangilash
    } catch (err) {
      console.error(err);
      message.error("Xatolik yuz berdi!");
    }
  };

  return (
    <Modal
      title="Yangi resurs qo‘shish"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="categoryId"
          label="Kategoriya"
          rules={[{ required: true, message: "Kategoriya tanlang" }]}
        >
          <Select placeholder="Kategoriya tanlang">
            {category.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Resurs nomi"
          rules={[{ required: true, message: "Resurs nomini kiriting" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Tavsif"
          rules={[{ required: true, message: "Tavsif kiriting" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="media"
          label="Media havolasi"
          rules={[{ required: true, message: "Media havolasini kiriting" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Rasm holati">
          <Select value={imageType} onChange={setImageType}>
            <Option value="url">Rasm havolasi</Option>
            <Option value="file">Rasm fayl</Option>
          </Select>
        </Form.Item>

        {imageType === "url" ? (
          <Form.Item
            name="image"
            label="Rasm URL"
            rules={[{ required: true, message: "Rasm URL kiriting" }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <Form.Item
            name="image"
            label="Rasm fayl"
            valuePropName="file"
            rules={[{ required: true, message: "Rasm fayl yuklang" }]}
          >
            <Upload.Dragger
              name="file"
              maxCount={1}
              beforeUpload={(file) => {
                const isValidType = file.type === "image/jpeg" || file.type === "image/png";
                const isValidSize = file.size / 1024 / 1024 < 5;
                if (!isValidType) {
                  message.error("Faqat JPG yoki PNG fayl bo‘lishi kerak!");
                  return Upload.LIST_IGNORE;
                }
                if (!isValidSize) {
                  message.error("Fayl hajmi 5MB dan oshmasligi kerak!");
                  return Upload.LIST_IGNORE;
                }
                return true;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Faylni bu yerga torting yoki yuklang
              </p>
            </Upload.Dragger>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Resurs qo‘shish
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResursModal;
