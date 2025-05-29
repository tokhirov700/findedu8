import { useEffect } from 'react';
import './style.css'
import AOS from "aos";
import "aos/dist/aos.css";

const Resurses = () => {

    useEffect(() => {  
      AOS.init({
        duration: 1500,
        once: true,
      });
    }, []);

  return (
    <div className="w-full min-h-[80vh] mb-[100px]">
         <section id="intro" data-aos="fade-up" className="h-[450px] mt-[20px] relative mb-[50px]">
        <div className="intro-color h-full w-full absolute inset-0"></div>
        <div className="container relative z-2 pt-[180px] px-[10px]">
          
          <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium">
            O‘quv resurslarini kashf et
          </p>
          <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium"> Ta'lim dasturlaringizni boyitish uchun yuqori sifatli materiallardan foydalaning</p>
          <h2 className="text-[50px] font-bold text-[#2D0E4E] mt-[10px]">
            O‘quv Resurslari
          </h2>
        </div>
      </section>
    </div>
  )
}

export default Resurses
