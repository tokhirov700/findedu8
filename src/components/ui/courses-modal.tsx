import { useState } from 'react';
import { Button, DatePicker, Select, Modal, Typography } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import './style.css';
import { isReseption } from '@/store/isReception';
import { useNotification } from '@/store/useNotification';

const { Title, Text } = Typography;
const { Option } = Select;

const CourseModal = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const {setNotification} = useNotification()
  const [form, setForm] = useState({
    filial: '',
    major: '',
    date: dayjs().add(1, 'day'),
    hour: '10:00',
  });

  const { postReseption } = isReseption();

  const hours = Array.from({ length: 5 }, (_, i) =>
    (10 + i * 2).toString().padStart(2, '0')
  );

  const handleSubmit = async () => {
    const { filial, major, date, hour } = form;

    const payload = {
      centerId: props.centerId,
      filialId: parseInt(filial),
      majorId: parseInt(major),
      visitDate: `${date.format('YYYY-MM-DD')} ${hour}:00:00`,
    };
    try{
        await postReseption(payload);
        setConfirmed(true);
    }catch(err:any){
        console.log(err)
        setNotification(err.response.data.message, 'error')
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        type="primary"
        className="mt-6 flex items-center gap-2 plan_service"
        icon={<FieldTimeOutlined />}
      >
        Darsga yozilish
      </Button>

      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setConfirmed(false);
        }}
        footer={
          confirmed
            ? null
            : [
                <Button key="cancel" onClick={() => setIsOpen(false)}>
                  Bekor qilish
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  className="confirmModal"
                  onClick={handleSubmit}
                >
                  Confirm Registration
                </Button>,
              ]
        }
        centered
        width={420}
        title={
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {confirmed ? 'Registration Confirmed!' : 'Darsga yozilish'}
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              {confirmed
                ? `Your class has been scheduled for ${form.date.format(
                    'DD MMMM YYYY'
                  )} в ${form.hour}:00`
                : "O'zingizga qulay sana va vaqtni tanlang"}
            </Text>
          </div>
        }
      >
        {confirmed ? (
          <div className="text-center space-y-4">
            <div className="text-green-900 text-3xl">✔️</div>
            <Text strong>Tanlangan filial:</Text>
            <div>
              {
                props?.filial?.find(
                  (f: any) => f.id.toString() === form.filial
                )?.name
              }
            </div>

            <Text strong>Tanlangan yo'nalish:</Text>
            <div>
              {
                props?.major?.find(
                  (m: any) => m.id.toString() === form.major
                )?.name
              }
            </div>

            <Text strong>Sana va vaqt:</Text>
            <div>
              {form.date.format('DD MMMM YYYY')} - {form.hour}:00
            </div>
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Filialni tanlang
              </label>
              <Select
                className="w-full"
                placeholder="Tanlang"
                value={form.filial}
                onChange={(value) => setForm({ ...form, filial: value })}
              >
                {props?.filial?.map((f: any) => (
                  <Option key={f.id} value={f.id.toString()}>
                    {f.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-1 font-medium">
                Yo'nalishni tanlang
              </label>
              <Select
                className="w-full"
                placeholder="Tanlang"
                value={form.major}
                onChange={(value) => setForm({ ...form, major: value })}
              >
                {props?.major?.map((m: any) => (
                  <Option key={m.id} value={m.id.toString()}>
                    {m.name}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm mb-1 font-medium">Sana</label>
                <DatePicker
                  className="w-full"
                  disabledDate={(current) =>
                    current && current < dayjs().endOf('day')
                  }
                  value={form.date}
                  onChange={(date) => setForm({ ...form, date: date! })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">Vaqt</label>
                <Select
                  className="w-full"
                  value={form.hour}
                  onChange={(value) => setForm({ ...form, hour: value })}
                >
                  {hours.map((h) => (
                    <Option key={h} value={h}>
                      {h}:00
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default CourseModal;
