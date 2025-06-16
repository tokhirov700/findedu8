import { useEffect } from 'react';
import CountUp from 'react-countup';
import AOS from "aos";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import "./style.css";
import 'aos/dist/aos.css';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <section id="intro" data-aos="fade-up" className="h-[450px] mt-[20px] relative mb-[50px]">
        <div className="intro-color h-full w-full absolute inset-0"></div>
        <div className="container relative z-2 pt-[180px] px-[10px]">
          <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium">
            Eng yaxshi ta'lim markazlarini topishda yordam beramiz!
          </p>
          <h2 className="text-[50px] font-bold text-[#2D0E4E] mt-[10px]">Biz haqimizda</h2>
        </div>
      </section>

      <section className="py-[60px] px-[20px]">
        <div className="max-w-7xl mx-auto  flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-[22px] font-bold text-[#101828] mb-4">
              Ishonchli va muvaffaqiyatli o'quvchilarni shakllantirish
            </h3>
            <p className="text-[#475467] mb-6">
              Bizning platformamiz talabalariga qiziqishlari, byudjeti va hududiga mos keladigan ta'lim markazlarini topishda yordam beradi, eng yaxshi ta'lim tajribasini ta'minlaydi.
            </p>
            <button className="bg-[#6F2CFF] text-white py-2 px-5 rounded-full font-semibold shadow-md">
              Ko‘proq ko‘rish
            </button>
            <div className="bg-white shadow-md rounded-xl p-4 mt-6 max-w-md">
              <p className="italic text-[#475467]">
                “Ushbu platforma mening uchun mukammal o‘quv markazini topishni osonlashtirdi. Juda tavsiya etaman!”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] font-bold text-[#2D0E4E] mb-10">Bizning ta'sirimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            <div className="bg-white rounded-xl shadow-md p-6">
              <FaUserGraduate className="text-[#6F2CFF] text-4xl mx-auto mb-4" />
              <p className="text-[32px] font-bold text-[#2D0E4E]">
                <CountUp start={0} end={80} duration={2} suffix="+" enableScrollSpy />
              </p>
              <p className="text-[#475467]">Muvaffaqiyat hikoyalari</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <FaChalkboardTeacher className="text-[#6F2CFF] text-4xl mx-auto mb-4" />
              <p className="text-[32px] font-bold text-[#2D0E4E]">
                <CountUp start={0} end={120} duration={2.5} suffix="+" enableScrollSpy />
              </p>
              <p className="text-[#475467]">Ta'lim markazlari</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <FaUsers className="text-[#6F2CFF] text-4xl mx-auto mb-4" />
              <p className="text-[32px] font-bold text-[#2D0E4E]">
                <CountUp start={0} end={250} duration={3} suffix="+" enableScrollSpy />
              </p>
              <p className="text-[#475467]">Ro'yxatdan o'tgan foydalanuvchilar</p>
            </div>
          </div>

          <h2 className="text-[32px] font-bold text-[#2D0E4E] mb-2">Bizning missiyamiz</h2>
          <div className="w-[70px] h-[4px] bg-yellow-400 mx-auto mb-10" />
          <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
            <div className="flex-1 text-left">
              <h3 className="text-xl font-semibold mb-4">Yorqin kelajak uchun o'quvchilarni kuchaytirish</h3>
              <p className="text-[#475467]">
                Biz talabalar va sifatli ta’lim o‘rtasidagi tafovutni bartaraf etishni maqsad qilganmiz, o‘quvchilarni eng yaxshi ta’lim muassasalari bilan bog‘laymiz.
              </p>
            </div>
            <div className="flex-1"></div>
          </div>

          <h2 className="text-[32px] font-bold text-[#2D0E4E] mb-10">Bizning qadriyatlarimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Sifat</h3>
              <p className="text-[#475467]">Biz har doim eng yuqori sifatni ta'minlashga intilamiz.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Ishonch</h3>
              <p className="text-[#475467]">Talabalar bizga ishonadi va biz bu ishonchni qadrlaymiz.</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Innovatsiya</h3>
              <p className="text-[#475467]">Biz ta'limda doimo yangiliklar yaratamiz.</p>
            </div>
          </div>

          <h2 className="text-[32px] font-bold text-[#2D0E4E] mb-10">Nima uchun bizni tanlashadi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Moslashtirilgan tavsiyalar</h3>
              <p className="text-[#475467]">
                Biz har bir foydalanuvchining ehtiyojlariga qarab eng yaxshi variantlarni taklif qilamiz.
              </p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Keng tanlov imkoniyati</h3>
              <p className="text-[#475467]">
                Platformamizda yuzlab markazlar orasidan tanlov qilish mumkin.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
