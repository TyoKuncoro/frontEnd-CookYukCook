import { useState } from "react";
import UbahMateriBtn from "./buttonUbahMateri";
import ListKelasRegular from "./listKelasRegular";
import ListTrainee from "./listTrainee";
import { Modal } from "antd";
import TambahMateri from "./material/formTambahMateri";

function DetailKelasRegular({classData, mutate, usersData, onClose }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState({ id: "", type: "" });
  const showModal = (id: any, type: any) => {
    setSelectedClass({ id, type });
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    onClose()
  };
  return (
    <div className="w-[900px] m-auto">
      <div className="float-right">
        <UbahMateriBtn
          text="Tambah Materi"
          key={null}
          onclick={() => showModal(classData.id, "Regular Class")}
        />
      </div>
      <p className="text-start font-medium text-2xl">{classData.courseName}</p>
      <div className="flex gap-5">
        <div>
          <ListKelasRegular onClose={onClose} classData={classData} mutate={mutate} />
        </div>
        <ListTrainee usersData={usersData} />
      </div>
      <Modal
        title="Tambah Materi Kelas"
        className="text-center"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <TambahMateri
          idClass={selectedClass.id}
          typeClass={selectedClass.type}
          onClose={closeModal}
          mutateData={mutate}
        />
      </Modal>
    </div>
  );
}
export default DetailKelasRegular;
