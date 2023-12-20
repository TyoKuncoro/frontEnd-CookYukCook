import {
  Button,
  Modal,
} from "antd";

// interface ModalPengajuanProps {
//   visible: boolean;
//   closeModal: () => void;
//   title: string;
//   content: React.ReactNode;
// }
const ModalTambahTema=(props:any)=> {
  const {title, closeModal, content, visible} = props;
  return (
    <Modal
    width={483}
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
export default ModalTambahTema;
