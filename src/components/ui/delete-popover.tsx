import { useState } from "react";
import { isComment } from "@/store/isComments";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useNotification } from "@/store/useNotification";

const DeletePopover = (props:any) => {
    const [open, setOpen] = useState(false);
    const {deleteComment} = isComment()
    const {setNotification} = useNotification()
    

    const hide = () => {
      setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };

    const DeleteComment = async (id:number) => {
        

        const response = await deleteComment(id)
        if(response.status == 200 && !props.keyword){
            setNotification("Sharh o'chirildi", 'success')
            const data = props.data.filter((e:any) => {
                return e?.id != id
            })
            props.setData(data)
        }

        if(props?.keyword == 'date'){
          const data = props.data.filter((e:any) => {
            if(e.id != id){
              return e
            }
          })
          props.setData(data)
        }  

        
        hide()
    }

  return (
    <Popover
      content={
        <div className="flex gap-[20px]">
          <Button onClick={() => DeleteComment(props.id)} className="popoverBtn">
            Ha
          </Button>
          <Button onClick={() => hide()} className="popoverBtn">
            Yo'q
          </Button>
        </div>
      }
      title="Sharhni o'chirmoqchimisiz ?"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <span className="cursor-pointer text-[18px] text-[red]">
        <DeleteOutlined />
      </span>
    </Popover>
  );
};

export default DeletePopover;
