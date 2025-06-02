import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Likes } from "@/store/liked";
import { CenterCard } from "@/components";
import { isUser } from "@/store/user";



const Fovorites = () => {
  const {LikesData, getLikes} = Likes()
  const {MyUser} = isUser()

  useEffect(() => {
      getLikes()

      AOS.init({
        duration: 1500,
        once: true,
      });
    }, [getLikes]);
  
  
  return (
    <div>
           <section id="intro" data-aos="fade-up" className="h-[450px] mt-[20px] relative mb-[50px]">
              <div className="intro-color h-full w-full absolute inset-0"></div>
              <div className="container relative z-2 pt-[180px] px-[10px]">
                <p className="text-[#2D0E4E] w-full max-w-[750px] text-[18px] font-medium">
               Sevimli o'quv markazlarini kashf eting
                </p>
                <h2 className="text-[50px] font-bold text-[#2D0E4E] mt-[10px]">Sevimli markazlar</h2>
              </div>
            </section>


           <div className="container flex flex-wrap gap-x-[33px] gap-y-[40px] filialsdata px-[10px] py-[50px]">
                {
                  LikesData.map((e:any,i:number) => {
                    return e.userId == MyUser?.id ? <CenterCard key={i} data={e.center}/> : '' 
                  })
                }
            </div>
    </div>
  )
}

export default Fovorites
