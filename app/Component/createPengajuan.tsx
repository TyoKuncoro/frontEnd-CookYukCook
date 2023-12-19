import {
  Button,
  Modal,
} from "antd";
import { useState } from "react";
import FormPengajuanKelas from "./formPengajuan";

const ModalPengajuan = () => {
  // const [loading, setLoading] = useState(false);
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
    <>
      <Button type="primary" onClick={showModal}>
        Ajukan Kelas
      </Button>
      <Modal
        open={open}
        title="Pengajuan Kelas Regular"
        className="text-center"
        width={720}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          ,
        ]}
      >
        <FormPengajuanKelas/>
      </Modal>
    </>
  );
};
export default ModalPengajuan;
