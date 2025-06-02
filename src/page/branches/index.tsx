import { useEffect } from "react"
import { isFilials } from "@/store/isFilials"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeftOutlined, BookOutlined, EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons"
import './style.css'

const Branches = () => {
  const {getFilialsById, isFilialData} = isFilials()
  const {id} = useParams()
  const navigate = useNavigate()
 
  useEffect(() => {
     getFilialsById(Number(id))
  }, [getFilialsById, id])

  return (
    <div className="mt-[140px] w-full max-w-[900px] mx-auto">
      <span className="text-[#872DD6] cursor-pointer px-[10px]" onClick={() => navigate(-1)}><ArrowLeftOutlined/> Markazga qaytish</span>

        <div className="mt-[20px] branch">
            <img className="px-[50px]" src={"https://findcourse.net.uz/api/image/" + isFilialData?.image} alt="Filial image" />
            
            <div className="px-[20px] mt-[20px]">
              <h4 className="text-[26px] font-bold">{isFilialData?.name}</h4>
              <p className="text-[18px] mt-[10px]"> <span className="text-[#872DD6]"><BookOutlined/> </span> {isFilialData?.region.name}</p>
              <div className="mt-[10px] flex gap-[10px]">
                <span className="text-[#872DD6]"><EnvironmentOutlined /></span>
                <div>
                    <p className="font-medium">Manzil</p>
                    <p>{isFilialData?.address}</p>
                </div>  
              </div>

              <div className="mt-[10px] flex gap-[10px] pb-[20px]">
                <span className="text-[#872DD6]"><PhoneOutlined/></span>
                <div>
                    <p className="font-medium">Telefon</p>
                    <p>{isFilialData?.phone}</p>
                </div>  
              </div>
            </div>
        </div>
    </div>
  )
}

export default Branches
