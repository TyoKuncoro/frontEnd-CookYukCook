import { Button, Modal } from "antd"
import { useState } from "react";
import FormUbahPengajuan from "./formUbahPengajuan";

const UbahPengajuan = ({idClass}:any) => {
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
        Ubah Pengajuan
      </Button>
      <Modal
        open={open}
        title="Ubah Pengajuan Kelas"
        className="text-center"
        width={483}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[,]}
      >
        <FormUbahPengajuan idClass={idClass}/>
      </Modal>
        </div>
    )
}
export default UbahPengajuan;