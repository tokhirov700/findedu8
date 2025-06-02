import {
  ArrowLeftOutlined,
  CalendarOutlined,
  CommentOutlined,
  EditOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  PushpinOutlined,
  ReadOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, useParams } from "react-router-dom";
import { isCenters, type CenterData } from "@/store/isCenters";
import { useEffect, useState } from "react";
import { Button, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { isComment } from "@/store/isComments";
import { useNotification } from "@/store/useNotification";
import { isUser } from "@/store/user";
import DeletePopover from "@/components/ui/delete-popover";
import CourseModal from "@/components/ui/courses-modal";

const CenterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCenterById } = isCenters();
  const [data, setData] = useState<CenterData | null>(null);
  const [star, setStar] = useState<number>(0);
  const [value, setValue] = useState('');
  const [rate, setRate] = useState(1)
  const [countRate, setCountRate] = useState(0)
  const [loader, setLoader] = useState(false)
  const {postComment, editComment} = isComment()
  const {setNotification} = useNotification()
  const [myComment, setMyComment] = useState([])
  const {MyUser} = isUser()
  const [deleteComments, setDeleteComments]:any = useState([])
  const [editActive, setEditActive] = useState(0)
  const [editValue, setEditValue] = useState('')
  const [editRateValue, setEditRateValue] = useState(1)
  const [activeCours, setActiveCourse]:any = useState(0)

  const EditComment = async () => {
      const params = {
        star: editRateValue,
        text: editValue
      }
      const response = await editComment(editActive, params) 
      if(response.status == 200){
        setNotification("Sharh o'zgartirildi", 'success')
        
        data?.comments.filter((e) => {
          if(e.id == editActive){
            return  e.star=editRateValue, e.text=editValue, e 
          }
          })

          const newData = myComment?.filter((e:any) => {
           if(e.id == editActive){
              return e.star =editRateValue, e.text=editValue, e
           } 
        })

        console.log(newData)
      }
      setEditActive(0)
  }

  const PostComment = async () => {
      const params = {
        centerId: Number(id),
        star: rate,
        text: value
      }

      const response = await postComment(params)
      if(response?.status == 201){
         setNotification("Sharh e'lon qilindi", 'success')
         const data:any = [response.data.data, ...myComment]
         setMyComment(data)
      }else{
        setNotification("Sharh e'lon qilishda muammo bor", 'error')
      }

      setRate(1)
      setValue('')
  }

  const editValueCommit = (id:number, value:string) => {
      setEditActive(id)
      setEditValue(value)
  }
  
  useEffect(()  => {
    setLoader(true)
    const fetchData = async () => {
      try{
        const response = await getCenterById(Number(id))
          setData(response);
          setDeleteComments(response.comments)
          const countStars = response.comments.map((e) => {
            return e.star;
          });
          let count = 0;
          countStars.forEach((e) => {
            count += e;
          });
          setCountRate(countStars.length)
          setStar(count);
      }catch(err){    
        
        console.log(err)
      }
    }

     window.scrollTo(0, 0);

    setTimeout(() => {
        setLoader(false)
    }, 1000);
   

    AOS.init({ // AOS ishga tushish jarayoini
      duration: 1500, // AOSni davomiylig vaqti
      once: true, // Faqat 1 marta ishlashligi
    });

    fetchData()
  }, [getCenterById, id] );

  return (

    <div>
        {
          loader ?
          <div className="text-center mt-[350px]">
          <div role="status">
            <svg aria-hidden="true" className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          </div>
          :
        <div className="container min-h-[100vh]">
          <div
            onClick={() => navigate("/")}
            className="mt-[100px] inline-block gap-[10px] font-normal text-[22px] cursor-pointer goback mb-[30px]"
          >
            <ArrowLeftOutlined />
            <h3 className="inline">Markazlarga qaytish</h3>
          </div>







        {   
          <div id="center" data-aos="fade-up" className="flex rounded-[12px] max-md:flex-col max-md:justify-center overflow-hidden mb-[50px]">
            <div className="w-full max-w-[550px] relative">
              <img
                className="w-full h-[250px] object-cover"
                src={"https://findcourse.net.uz/api/image/" + data?.image}
                alt="Center image"
              />
              <div className="p-[20px]">
                <h3 className="font-medium text-[20px] mb-[10px]">
                  Bizning filiallar
                </h3>

                {data?.filials.map((e, i: number) => {
                  return (
                    <div
                      onClick={() => navigate(`/branches/${e.id}`)}
                      className="py-[8px] px-[15px] mb-[10px] cursor-pointer transition-all  hover:bg-[#ead7ff] bg-[#F3E8FF] border-[#D8B4FE] border-[1px] rounded-[12px]"
                      key={i}
                    >
                      <h4 className="font-semibold text-[17px] mb-[-5px]">
                        {e?.name}
                      </h4>
                      <p className="text-[#000000a6] text-[14px]">{e?.address}</p>
                    </div>
                  );
                })}

                <h3 className="font-medium text-[20px] mb-[10px] mt-[30px] flex items-center gap-[10px]">
                  <ReadOutlined />
                  Mavjud kurslar
                </h3>

                <div className="flex items-center gap-[10px] flex-wrap">
                  {data?.majors?.map((e, i: number) => {
                    return (
                      <div
                        onClick={() => setActiveCourse(e.id)}
                        className={`flex items-center gap-[10px] px-[10px] py-[7px] cursor-pointer border-[1px] border-[silver] rounded-[10px] ${e.id == activeCours ? "activeCourse" : ''}`}
                        key={i}
                      >
                        <span className="flex justify-center items-center bg-[#F3E8FF] p-[6px] rounded-[6px] text-[#A855F7]">
                          <PushpinOutlined />
                        </span>
                        <h4 className="font-semibold text-[18px]">{e?.name}</h4>
                      </div>
                    );
                  })}
                </div>

                <CourseModal centerId={Number(id)} filial={data?.filials} major={data?.majors}/>

              
              </div>
            </div>

                
                {/* ---------------------------------------- */}



            <div className="px-[20px] py-[20px] w-full">
              <div className="flex justify-between items-start">
                  <div>
                    <h1 className="font-bold text-[30px]">{data?.name}</h1>
                      <p className="text-[#00000096]"> <EnvironmentOutlined /> {data?.address}</p>
                  </div>
                <div className="flex items-center bg-[#F3E8FF] py-[5px] px-[15px] rounded-[20px]">
                  <span className="text-[yellow] text-[24px]">
                  <StarFilled />
                  </span>
                  <span className="font-bold">{Math.ceil(star / countRate) ? Math.ceil(star / countRate) : 0}</span>
                </div>
              </div>

              <h4 className="mt-[20px] text-[16px] font-medium text-[#00000089]">Phone</h4>
              <p className="text-[21px] font-semibold"><span><PhoneOutlined/></span> <span>{data?.phone}</span></p>

              <h4 className="mt-[20px] text-[21px] font-medium mb-[15px]"><span><CommentOutlined/></span> <span>Sharhlar ({data?.comments?.length})</span></h4>

              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Bu markaz haqida fikrlaringizni bildiring...."
                autoSize={{ minRows: 4, maxRows: 5 }}
                className="w-full coment"
              />

              <div className="flex items-center gap-[10px] mt-[15px]">
                <p>Reyting:</p>
                <Rate value={rate} onChange={(e) => setRate(e)}/>
              </div>

              <div className="flex justify-end mt-[10px]">
                  {
                    value ? <Button onClick={() => PostComment()} type="primary" className="ButtonComment Avtivated">Sharh qoldirish</Button> : <Button type="primary" className="ButtonComment Disabled" disabled>Sharh qoldirish</Button>
                  }
              </div>
              

              {
                myComment.length || deleteComments.length ?  <div className="mt-[50px]">
                   {
                    myComment?.map((e:any, i:number) => {
                      return <div key={i} className="p-[12px] mb-[10px] bg-[#f7f8f8]">
                          {
                            editActive == e.id ?
                            ''
                            :
                            <div className="flex justify-between items-center mb-[10px] max-sm:flex-col max-sm:flex-wrap max-sm:items-start">
                              <div className="flex justify-between items-baseline gap-[10px] max-sm:flex-col max-sm:justify-start">
                                <span className="text-[#00000077] text-[18px]"><UserOutlined/></span>
                                <span className="font-medium">{MyUser?.firstName} {MyUser?.lastName}</span>
                                <span className="text-[10px]"><Rate style={{ fontSize: '14px' }} disabled value={e.star}/></span>
                              </div>

                              <div className="flex justify-between items-center gap-[10px]">
                                <span className="text-[14px] text-[#00000072] "><CalendarOutlined/></span>
                                <span className="text-[14px] text-[#00000072] ">{e?.createdAt.split('T')[0]}</span>
                                <span onClick={() => editValueCommit(e.id, e.text)} className="cursor-pointer text-[18px] text-[blue]"><EditOutlined /></span>
                                <DeletePopover id={e.id} data={myComment} setData={setMyComment}/> 
                              </div>
                            </div>
                          }
                          
                            {
                            editActive == e.id ?
                              <div>
                                   <TextArea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder="Bu markaz haqida fikrlaringizni bildiring...."
                                    autoSize={{ minRows: 4, maxRows: 5 }}
                                    className="w-full coment"
                                  />
                                    <div className="flex items-center gap-[10px] mt-[15px]">
                                      <p>Reyting:</p>
                                      <Rate value={editRateValue} onChange={(e) => setEditRateValue(e)}/>
                                    </div>

                                    <div className="flex justify-end gap-[10px]">
                                        <Button onClick={() => setEditActive(0)} className="btnEditCommit">Bekor qilish</Button>
                                        <Button onClick={() => EditComment()} type="primary" className="btnEditCommit">Saqlash</Button>
                                    </div>
                              </div>
                            :
                            <p>{e?.text}</p>
                          }
                      </div>

                    
                    })

                    

                    
                  }

                  


                  {
                    deleteComments.map((e:any, i:number) => {
                      return <div key={i} className="p-[12px] mb-[10px] bg-[#f7f8f8]">
                          {
                            editActive == e.id ?
                            ""
                            :
                             <div className="flex justify-between items-center mb-[10px] max-sm:flex-col max-sm:flex-wrap max-sm:items-start">
                              <div className="flex justify-between items-baseline gap-[10px] max-sm:flex-col max-sm:justify-start">
                                <span className="text-[#00000077] text-[18px]"><UserOutlined/></span>
                                <span className="font-medium">{e.user.firstName} {e.user.lastName}</span>
                                <span className="text-[10px]"><Rate style={{ fontSize: '14px' }} disabled value={e.star}/></span>
                              </div>

                              <div className="flex justify-between items-center gap-[10px]">
                                <span className="text-[14px] text-[#00000072] "><CalendarOutlined/></span>
                                <span className="text-[14px] text-[#00000072] ">{e?.createdAt.split('T')[0]}</span>
                                       {
                                  e.userId == MyUser?.id ? 
                                        <span onClick={() => editValueCommit(e.id, e.text)} className="cursor-pointer text-[18px] text-[blue]"><EditOutlined /></span>
                                      : ""
                                    
                                }

                                
                                {
                                  e.userId == MyUser?.id ? 
                                      <DeletePopover id={e.id} data={deleteComments} setData={setDeleteComments} keyword="date" /> 
                                    : ""
                                    
                                }
                              
                              </div>
                            </div>
                          }
                          {
                            editActive == e.id ?
                              <div>
                                   <TextArea
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder="Bu markaz haqida fikrlaringizni bildiring...."
                                    autoSize={{ minRows: 4, maxRows: 5 }}
                                    className="w-full coment"
                                  />
                                    <div className="flex items-center gap-[10px] mt-[15px]">
                                      <p>Reyting:</p>
                                      <Rate value={editRateValue} onChange={(e) => setEditRateValue(e)}/>
                                    </div>

                                    <div className="flex justify-end gap-[10px]">
                                        <Button onClick={() => setEditActive(0)} className="btnEditCommit">Bekor qilish</Button>
                                        <Button onClick={() => EditComment()} type="primary" className="btnEditCommit">Saqlash</Button>
                                    </div>
                              </div>
                            :
                            <p>{e?.text}</p>
                          }
                      </div>
                    })
                  }
              </div>
              :
              <p className="text-[16px] text-[#0000007a] mt-[15px]">Hali sharhlar mavjud emas. Birinchi bo'ling!</p>
              }

                  



            </div>
          </div>
        }
        </div>
        }



        
    </div>

  );
};

export default CenterPage;
