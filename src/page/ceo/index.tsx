import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import CeoForm from '../../components/ceo-form'
import { isRegion } from "@/store/isRegion";
import { isMajors } from "@/store/isMajors";
import BranchForm from "@/components/ceo-branch-form";
import { isCenters } from "@/store/isCenters";

const CEO = () => {
  const {getRegions, dataRegion} = isRegion()
  const {getMajors, dataMajors} = isMajors()
  const {isCenterData} = isCenters()

  useEffect(() => {
    getRegions()
    getMajors()
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, [getRegions, getMajors]);

  return (
    <div className="w-full min-h-[80vh] mb-[100px]">
   
      <section
        id="intro"
        data-aos="fade-up"
        className="h-[450px] mt-[20px] relative mb-[50px]"
      >
        <div className="intro-color h-full w-full absolute inset-0"></div>
       
        <div className="container relative z-2 pt-[160px] px-[10px]">
          <p className="text-[#2D0E4E] w-full max-w-[550px] text-[18px] font-medium">
            O'quv markazingizni qo'shing
          </p>
          <p className="text-[#2D0E4E] w-full max-w-[450px] text-[18px] font-medium">
            {" "}
            Bizga qo'shiling va talabalarga eng yaxshi o'quv imkoniyatlarini
            topishda yordam bering.
          </p>
          <h2 className="text-[50px] font-bold text-[#2D0E4E] mt-[10px]">
            CEO Sahifasi
          </h2>
        </div>
      </section>

      
      <section>
        <div className="container">
            <div className="form">
                <CeoForm region={dataRegion} major={dataMajors}/>
                <div className="mt-[50px]"></div>
                <BranchForm regions={dataRegion} centers={isCenterData}/>
            </div>
        </div>
      </section>
     
    </div>
  );
};

export default CEO;
