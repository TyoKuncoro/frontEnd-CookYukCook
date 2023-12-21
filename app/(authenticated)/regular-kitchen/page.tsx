"use client";
import React, { useEffect, useState } from "react";
import { CollapseProps } from "antd/lib";
import ListKelasRegular from "#/app/Component/listKelasRegular";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ListTrainee from "#/app/Component/listTrainee";
import ModalPengajuan from "#/app/Component/createPengajuan";
import TambahMateri from "#/app/Component/material/modalTambahTema";
import UbahMateri from "#/app/Component/material/modalUbahMateri";
import FormPengajuanKelas from "#/app/Component/formPengajuan";
import TemaKelas from "#/app/Component/temaKelas";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { materiRepository } from "#/repository/materi";
import CreateMateriModal from "#/app/Component/material/formTambahMateri";

const ListRegular = () => {
  const [modalOpen, setModalOpen] = useState(false);
  //ambil id
  const token = localStorage.getItem("access_token");
  let id;
  if (token) {
    id = parseJwt(token).id;
    // console.log(id);
  }
  const [regular, setRegular] = useState([]);
  const { data } = regularClassRepository.hooks.findRegClassByKitchen(id);
  console.log(data?.data?.material, 'hallooo')
  useEffect(() => {
    setRegular(data?.data);
  }, [data]);
  const handleOK = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <div className="bg-white p-20 w-full space-y-16">
      <div className="float-right mr-3">
        <UbahMateriBtn text="Ajukan Kelas" key={null} onclick={handleOK} />
        {/* <ModalPengajuan/> */}
      </div>
      {data && data.data && (
        <div>
          {data.data.map((items: any) => {
            return (
              <div key={items.id}>
                <div className="flex justify-between">
                  <div className=" space-y-0">
                    <p className="text-4xl font-bold">{items.courseName}</p>
                    <p className="text-2xl">Tema: {items.theme.name}</p>
                    <p className="text-xl">Chef: {items.theme.chef_name}</p>
                  </div>
                </div>

                <div className="flex w-full gap-52">
                  <div>
                    <div className="flex justify-between">
                      <p className="text-3xl font-bold">Materi Kelas</p>
                      
                      <UbahMateriBtn
                        text="Tambah Materi"
                        key={items.id}
                        onclick={showModal}
                        />
                      <CreateMateriModal
                        idClass={items.id}
                        type_class={"Regular Class"}
                        visible={modalVisible}
                        onClose={closeModal}
                      />
                    </div>
                    <div className="div-list w-[1020px] h-auto p-2 rounded-lg">
                      <ListKelasRegular classData={items} />
                    </div>
                  </div>
                  <div>
                    <ListTrainee />
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
      <ModalPengajuan
        title="Pengajuan Kelas"
        closeModal={handleClose}
        visible={modalOpen}
        content={<FormPengajuanKelas />}
      />
      <TemaKelas />
    </div>
  );
};
export default ListRegular;
