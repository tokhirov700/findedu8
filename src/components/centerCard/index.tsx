import { HeartOutlined, PhoneOutlined } from "@ant-design/icons"
import './style.css'
import type { CenterData } from "@/store/isCenters"
import { useNavigate } from "react-router-dom"

interface props{
  data: CenterData
}
const CenterCard = (props:props) => {
  const {image, id, name, address, phone } = props.data
  const navigate = useNavigate()
  return (
    <div className="max-w-[250px] w-full relative rounded-[16px] overflow-hidden h-[340px] filialCard">
          <div onClick={() => navigate(`/center/${id}`)} className="cursor-pointer">
           <img className="w-full h-[180px] object-cover mb-[10px]" src={"https://findcourse.net.uz/api/image/" + image} alt="Filial rasmi" />
            <div className="relative px-[20px] py-[10px]">
              <p className="text-[20px] font-semibold ">{name}</p>
              <p className="text-[14px] text-[#00000070] mt-[5px]">{address}</p>
              <p className="text-[15px] text-[#00000070] flex gap-2 mt-[3px]">
                <PhoneOutlined/>
                <span>{phone}</span>
              </p>

            </div>
          </div>
        <span onClick={() => console.log(id)} className="absolute top-[10px] right-[10px] text-[20px] w-[40px] h-[40px] z-50 flex justify-center items-center bg-white rounded-[50%]"><HeartOutlined/></span>
    </div>

  )
}

export default CenterCard
