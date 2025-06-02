import { isUser } from "@/store/user";
import { Table, Button, Image } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Reseptions = () => {
  const { MyUser, getMyUser } = isUser();

  const columns = [
    {
      title: "Rasm",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <Image
          width={60}
          src={`https://findcourse.net.uz/api/image/${image}`}
          alt="Filial rasmi"
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Filial nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tashrif kuni",
      dataIndex: "visitDate",
      key: "visitDate",
    },
    {
      title: "Tashrif vaqti",
      dataIndex: "visitTime",
      key: "visitTime",
    },
    {
      title: "Kurs nomi",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Batafsil",
      key: "action",
      render: (_: any, record: any) => (
        <Link to={`/center/${record.centerId}`}>
          <Button type="primary" size="small">Ko‘rish</Button>
        </Link>
      ),
    },
  ];

  const dataSource = MyUser?.receptions?.map((e, index) => ({
    key: index,
    image: e.filial?.image,
    name: e.filial?.name,
    address: e.filial?.address,
    phone: e.filial?.phone,
    visitDate: e.visitDate.split("T")[0],
    visitTime: e.visitDate.split("T")[1].split(".")[0],
    course: e.major?.name,
    centerId: e.centerId,
  })) || [];

  useEffect(() => {
    getMyUser()
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, [getMyUser]);

  return (
    <div>
      {/* Hero Section */}
      <section
        id="intro"
        data-aos="fade-up"
        className="min-h-[300px] md:min-h-[450px] mt-5 relative mb-12 px-4"
      >
        <div className="intro-color absolute inset-0 w-full h-full"></div>
        <div className="container relative z-10 pt-24 md:pt-40">
          <p className="text-[#2D0E4E] text-lg md:text-xl font-medium max-w-3xl">
            Navbatlaringizni kuzatib boring
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2D0E4E] mt-2">
            Navbatlar
          </h2>
        </div>
      </section>

      {/* Table Section */}
      <div className="container px-4">
         <div className="block md:hidden text-center text-sm text-gray-600 mb-2">
            Jadvalni to‘liq ko‘rish uchun yon tomonga suring ⟶
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 5 }}
            bordered
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Reseptions;
