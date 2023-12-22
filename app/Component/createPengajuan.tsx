import {
  Button,
  Modal,
} from "antd";
import { useState } from "react";
import FormPengajuanKelas from "./formPengajuan";

// interface ModalPengajuanProps {
//   visible: boolean;
//   closeModal: () => void;
//   title: string;
//   content: React.ReactNode;
// }
const ModalPengajuan=(props:any)=> {
  const {title, closeModal, content, visible} = props;
  return (
    <Modal
    width={720}
    className="text-center"
      title={title}
      visible={visible}
      onCancel={closeModal}
      footer={null}
    >
      {content}
    </Modal>
  );
};
export default ModalPengajuan;
