import { Button, Modal } from "antd"
import FormUbahMateri from "./formUbahMateri";
import { useState } from "react";

const UbahMateri = ({idMateri, mutate}:any) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 500);
  };

  const handleCancel = () => {
    setOpen(false);
  };
    return (
        <div>
        <Button type="primary" onClick={showModal}>
        Ubah Materi
      </Button>
      <Modal
        open={open}
        title="Ubah Materi"
        className="text-center"
        width={483}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[,]}
      >
        
        <FormUbahMateri idMateri={idMateri} onclose={handleOk} mutate={mutate}/>
      </Modal>
        </div>
    )
}
export default UbahMateri;