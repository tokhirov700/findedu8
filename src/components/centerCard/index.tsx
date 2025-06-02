import { HeartOutlined, PhoneOutlined } from "@ant-design/icons"
import './style.css'
import type { CenterData } from "@/store/isCenters"
import { useNavigate } from "react-router-dom"
import http from "@/config"
import { message } from "antd"
import { Likes } from "@/store/liked"
import { isUser } from "@/store/user"
import { useEffect, useState } from "react"

interface props{
  data: CenterData
}
const CenterCard = (props:props) => {
  const {image, id, name, address, phone } = props.data
  const navigate = useNavigate()
  const {getLikes, LikesData} = Likes()
  const {MyUser} = isUser()

  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!MyUser) {
      setIsLiked(false)
      return
    }
    // Like qilinganmi - user.id va centerId bir va biriga mos kelishi kerak
    const likedNow = LikesData.some((like:any) => like.centerId === id && like.user.id === MyUser.id)
    setIsLiked(likedNow)
  }, [LikesData, id, MyUser])

 const toggleLike = async () => {
  if (!MyUser) {
    message.warning("Like qo'yish uchun avval tizimga kiring")
    return
  }
  if (loading) return
  setLoading(true)
  try {
    if (!isLiked) {
      // Like qo'yish
      await http.post('/liked', {centerId: id})
      message.success('Sevimlilar safiga qo\'shildi', 2)
    } else {
      // Like obyekti topiladi
      const likeObj = LikesData.find((like:any) => like.centerId === id && like.user.id === MyUser.id)
      if (!likeObj) {
        throw new Error("Like topilmadi")
      }
      // Like ni o'chirish uchun o'sha likeObj.id yuboriladi
      await http.delete(`/liked/${likeObj.id}`)
      message.success('Like olindi', 2)
    }
    await getLikes()
    setIsLiked(!isLiked)
  } catch (err:any) {
    message.error(err.message || 'Xatolik yuz berdi')
  }
  setLoading(false)
}


  return (
    <div className="max-w-[250px] w-full relative rounded-[16px] overflow-hidden h-[340px] filialCard">
      <div onClick={() => navigate(`/center/${id}`)} className="cursor-pointer">
        <img
          className="w-full h-[180px] object-cover mb-[10px]"
          src={"https://findcourse.net.uz/api/image/" + image}
          alt="Filial rasmi"
        />
        <div className="relative px-[20px] py-[10px]">
          <p className="text-[20px] font-semibold ">{name}</p>
          <p className="text-[14px] text-[#00000070] mt-[5px]">{address}</p>
          <p className="text-[15px] text-[#00000070] flex gap-2 mt-[3px]">
            <PhoneOutlined />
            <span>{phone}</span>
          </p>
        </div>
      </div>

      <span
        onClick={(e) => {
          e.stopPropagation()
          toggleLike()
        }}
        className={`absolute top-[10px] right-[10px] text-[20px] w-[40px] h-[40px] z-50 flex justify-center items-center bg-white rounded-[50%] cursor-pointer
          ${isLiked ? 'text-red-500' : 'text-black'}
        `}
      >
        <HeartOutlined />
      </span>
    </div>
  )
}

export default CenterCard
