import { Button, Modal } from "antd"
import FormUbahMateri from "./formUbahMateri";
import { useState } from "react";

const UbahMateri = ({idMateri}:any) => {
    const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  // const handleOk = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOpen(false);
  //   }, 3000);
  // };

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
        
        <FormUbahMateri idMateri={idMateri} />
      </Modal>
        </div>
    )
}
export default UbahMateri;