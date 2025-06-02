import { useEffect, useState } from 'react';
import './style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button, Input } from 'antd';
import {
  BookOutlined,
  EyeOutlined,
  SearchOutlined,
  StarFilled,
  UploadOutlined,
} from '@ant-design/icons';
import http from '@/config';
import { Link } from 'react-router-dom';
import ResursModal from '@/components/resurs-modal';
import { isUser } from '@/store/user';

const Resurses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState([]);
  const [resours, setResours] = useState([]);

  const handleDelete = async (id: number) => {
  try {
    await http.delete(`/resources/${id}`);
    getResources(); // O'chirgandan keyin ro'yxatni yangilash
  } catch (error) {
    console.error("Resursni o'chirishda xatolik:", error);
  }
};

  const [activeCategory, setActiveCategory] = useState<'all' | 'mine' | number>('all');

  const { MyUser } = isUser();

  const getCategories = async () => {
    try {
      const response = await http.get('/categories');
      setCategory(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getResources = async () => {
    try {
      const response = await http.get('/resources');
      setResours(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    getResources();
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const filteredResources = resours.filter((res: any) => {
    const matchesCategory =
      activeCategory === 'all'
        ? true
        : activeCategory === 'mine'
        ? res.user.id === MyUser?.id
        : res.category.id === activeCategory;

    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-[80vh] mb-[100px]">
      <section id="intro" data-aos="fade-up" className="h-[450px] mt-[20px] relative mb-[50px]">
        <div className="intro-color h-full w-full absolute inset-0"></div>
        <div className="container relative z-2 pt-[180px] px-[10px]">
          <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium">
            O‘quv resurslarini kashf et
          </p>
          <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium">
            Ta'lim dasturlaringizni boyitish uchun yuqori sifatli materiallardan foydalaning
          </p>
          <h2 className="text-[50px] font-bold text-[#2D0E4E] mt-[10px]">O‘quv Resurslari</h2>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="search pt-[20px]">
            <Input
              className="search-input"
              placeholder="Resurslarni qidirish..."
              prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mt-[50px]">
            <h3 className="font-medium text-[20px] mb-[10px]">Kategoriya bo'yicha filtirlash</h3>

            <div className="flex items-center justify-center gap-[12px] w-full flex-wrap">
              <div
                onClick={() => setActiveCategory('all')}
                className={`w-[240px] h-[180px] cursor-pointer rounded-[10px] overflow-hidden ${
                  activeCategory === 'all' ? 'border-2 border-blue-500' : ''
                }`}
              >
                <p className="h-[140px] w-[100%] flex items-center justify-center text-[30px] bg-[#F3F4F6]">
                  <SearchOutlined />
                </p>
                <h2 className="text-center font-medium text-[17px]">Barcha resurslar</h2>
              </div>

              <div
                onClick={() => setActiveCategory('mine')}
                className={`w-[240px] h-[180px] cursor-pointer rounded-[10px] overflow-hidden ${
                  activeCategory === 'mine' ? 'border-2 border-blue-500' : ''
                }`}
              >
                <p className="h-[140px] w-[100%] flex items-center justify-center text-[30px] bg-[#F3F4F6] text-[#adad04]">
                  <StarFilled />
                </p>
                <h2 className="text-center font-medium text-[17px]">Mening resurslarim</h2>
              </div>

              {category.map((cat: any) => (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-[240px] h-[180px] cursor-pointer rounded-[10px] overflow-hidden hover:shadow transition ${
                    activeCategory === cat.id ? 'border-2 border-blue-500' : ''
                  }`}
                >
                  <img
                    className="h-[140px] w-full object-cover"
                    src={'https://findcourse.net.uz/api/image/' + cat.image}
                    alt="category image"
                  />
                  <h2 className="text-center font-medium text-[17px]">{cat.name}</h2>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="save mx-auto mt-[30px]"
              style={{ color: 'white', display: 'block' }}
            >
              Resurs qo'shish
            </Button>

            <ResursModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              category={category}
              getResources={getResources}
            />
          </div>

          <div className="flex mt-[50px] resurs-wrapper flex-wrap justify-center gap-x-[10px] gap-y-[30px]">
            {filteredResources.map((e: any, i: number) => (
              <div
                key={i}
                className="w-full max-w-[450px] min-h-[500px] border border-b-slate-100 rounded-[10px] overflow-hidden"
              >
                <img className="w-full h-[220px] object-cover" src={e.image} alt="Resurs image" />
                <div className="p-[20px]">
                  <h4 className="text-[20px] font-medium text-[#00000064]">
                    <BookOutlined /> Resource
                  </h4>
                  <h2 className="mt-[20px] text-[20px] font-medium mb-[6px]">{e.name}</h2>
                  <h3 className="font-normal mb-[11px] text-[#00000064]">by {e.user.firstName}</h3>
                  <p className="text-[14px] line-clamp-3 h-[50px] leading-[17px] text-[#00000093]">
                    {e.description}
                  </p>
                  <p className="text-end mt-[20px] text-[14px] text-[#00000064]">
                    {e.createdAt.split('T')[0]}
                  </p>

                  <div className="mt-[10px] flex justify-between">
                    <Link target="_blank" to={e.media}>
                      <Button className="save" style={{ color: 'white' }}>
                        <EyeOutlined /> Oldindan ko'rish
                      </Button>
                    </Link>
                    <a
                      href={e.media}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="save" style={{ color: 'white' }}>
                        <UploadOutlined /> Yuklab olish
                      </Button>
                    </a>

                    {MyUser?.id === e.user.id && (
                      <Button danger onClick={() => handleDelete(e.id)}>
                        O‘chirish
                      </Button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resurses;
