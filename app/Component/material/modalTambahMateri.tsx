import { useState } from "react";
import FormTambahMateri from "./formTambahMateri";
import { Button, Modal } from "antd";
import FormUbahMateri from "./formUbahMateri";

const TambahMateri = () => {
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
        Tambah Materi
      </Button>
      <Modal
        open={open}
        title="Tambah Materi"
        className="text-center"
        width={483}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[,]}
      >
        <FormTambahMateri />
      </Modal>
    </div>
  );
};
export default TambahMateri;