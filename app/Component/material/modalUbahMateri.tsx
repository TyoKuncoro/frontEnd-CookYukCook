import { Button, Modal, message } from "antd"
import FormUbahMateri from "./formUbahMateri";
import { useState } from "react";

const UbahMateri = ({idMateri, mutate, onClose}:any) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      // setOpenModal(false)
      onClose();
      message.success('Materi berhasil diubah')
    }, 500);
    await mutate
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
        // onOk={setOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[,]}
      >
        
        <FormUbahMateri idMateri={idMateri} onclose={handleOk} mutate={mutate}/>
      </Modal>
        </div>
    )
}
export default UbahMateri;