import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import { Button, Checkbox, Input, Modal, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CenterCard } from "@/components";
import { isCenters } from "@/store/isCenters";
import { isUser } from "@/store/user";

const Home = () => {
  const { isCenterData } = isCenters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const regions = ['Toshkent', "Andijon", "Namangan", "Farg'ona", "Sirdaryo", "Jizzax", "Samarqand", "Navoiy", "Qashqadaryo", "Surxondaryo", "Xorazm", "Buxoro"];
  const [majors, setMajors] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const {getMyUser} = isUser()

  // Filter logic
 const filteredCenters = isCenterData.filter((center) => {
  const matchesSearch = searchTerm
    ? center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.region?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.majors?.some((m: any) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : true;

  const matchesRegions = selectedRegions.length
    ? selectedRegions.includes(center.region?.name)
    : true;

  const matchesMajors = selectedMajors.length
    ? center.majors?.some((m: any) => selectedMajors.includes(m.name))
    : true;

  return matchesSearch && matchesRegions && matchesMajors;
});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getMyUser()
    const major: any = [];
    isCenterData.forEach((e) => {
      major.push(...e.majors);
    });

    const newMajor: any = [];
    major.forEach((e:any) => {
      if (!newMajor.includes(e.name)) newMajor.push(e.name);
    });

    setMajors(newMajor);

    AOS.init({
      duration: 1500,
      once: true,
    });
  }, [isCenterData, getMyUser]);

  const handleMajorChange = (value: string) => {
    setSelectedMajors((prev) =>
      prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value]
    );
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegions((prev) =>
      prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value]
    );
  };

  const removeSelectedMajor = (value: string) => {
    setSelectedMajors((prev) => prev.filter((e) => e !== value));
  };

  const removeSelectedRegion = (value: string) => {
    setSelectedRegions((prev) => prev.filter((e) => e !== value));
  };

  return (
    <div className="w-full min-h-[80vh] mb-[100px]">
      {/* Intro section */}
      <section id="intro" data-aos="fade-up" className="h-[450px] mt-[20px] relative mb-[50px]">
        <div className="intro-color h-full w-full absolute inset-0"></div>
        <div className="container relative z-2 pt-[150px] px-[10px]">
          <h2 className="text-[50px] font-bold text-[#2D0E4E] mb-[10px]">
            Bir qidiruv - cheksiz imkoniyatlar
          </h2>
          <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium">
            Biz talabalarga dunyo bo'ylab eng yaxshi kurslar, markazlar va
            ta'lim imkoniyatlarini topishda yordam beramiz...
          </p>
        </div>
      </section>

      {/* Search */}
      <section>
        <div className="max-w-[900px] w-full mx-auto flex gap-[30px] px-[10px] max-md:flex-wrap mb-[30px]">
          <Input
            className="search-input"
            placeholder="Kasb, fan yoki o'quv markazi nomini kiriting..."
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={showModal} type="primary" className="search-button">
            Kurslar va Hududlar
          </Button>
        </div>

        {/* Tanlanganlar */}
        <div className="max-w-[900px] mx-auto px-[10px] mb-[30px]">
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedMajors.map((major, i) => (
              <Tag
                key={i}
                closable
                onClose={() => removeSelectedMajor(major)}
                color="blue"
                className="cursor-pointer"
              >
                {major}
              </Tag>
            ))}
            {selectedRegions.map((region, i) => (
              <Tag
                key={i}
                closable
                onClose={() => removeSelectedRegion(region)}
                color="green"
                className="cursor-pointer"
              >
                {region}
              </Tag>
            ))}
          </div>
        </div>
        

        {(selectedMajors.length > 0 || selectedRegions.length > 0 || searchTerm) && (
          <div className="max-w-[900px] mx-auto px-[10px] mb-[20px] flex justify-center">
            <Button
              type="default"
              danger
              onClick={() => {
                setSelectedMajors([]);
                setSelectedRegions([]);
                setSearchTerm("");
              }}
            >
              Barchasini tozalash
            </Button>
          </div>
        )}

        {/* Data Cards */}
            {
              filteredCenters.length ?  <div className="container flex flex-wrap gap-x-[33px] gap-y-[40px] filialsdata px-[10px]">
            {filteredCenters.map((e, i: number) => (
              <CenterCard key={i} data={e} />
            ))}
          </div>
          :
          <p className="text-center ">Filtrlarga mos markazlar topilmadi.</p>
            }
      </section>

      {/* Modal */}
      <Modal
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
      >
        <div className="flex justify-between pr-[30px] pt-[40px]">
          {/* Majors */}
          <div className="w-[50%]">
            <h4 className="text-[22px] font-semibold mb-[10px]">
              Yo'nalishlarni tanlang
            </h4>
            <div className="flex flex-col gap-[5px] pr-2">
              {majors.map((e: string, i: number) => (
                <Checkbox
                  className="text-[16px] font-medium"
                  key={i}
                  checked={selectedMajors.includes(e)}
                  onChange={() => handleMajorChange(e)}
                >
                  {e}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* Regions */}
          <div className="w-[50%]">
            <h4 className="text-[22px] font-semibold mb-[10px]">
              Regionlarni tanlang
            </h4>
            <div className="flex flex-col gap-[5px]  pr-2">
              {regions.map((e: string, i: number) => (
                <Checkbox
                  className="text-[16px] font-medium"
                  key={i}
                  checked={selectedRegions.includes(e)}
                  onChange={() => handleRegionChange(e)}
                >
                  {e}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
