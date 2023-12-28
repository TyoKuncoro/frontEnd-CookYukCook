"use client";

import React, { useEffect, useState } from "react";
import { CollapseProps } from "antd/lib";
import ListKelasRegular from "#/app/Component/listKelasRegular";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ListTrainee from "#/app/Component/listTrainee";
import ModalPengajuan from "#/app/Component/createPengajuan";
import TambahMateri from "#/app/Component/material/formTambahMateri";
import UbahMateri from "#/app/Component/material/modalUbahMateri";
import FormPengajuanKelas from "#/app/Component/formPengajuan";
import TemaKelas from "#/app/Component/temaKelas";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { materiRepository } from "#/repository/materi";
import CreateMateriModal from "#/app/Component/material/formTambahMateri";
import { Button, Modal, Space, Table } from "antd";
import FormUbahPengajuan from "#/app/Component/formUbahPengajuan";
import UbahPengajuan from "#/app/Component/modalUbahPengajuan";
import { ColumnsType } from "antd/es/table";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailKelasRegular from "#/app/Component/modalDetailKelas";
import { mutate } from "swr";

const ListRegular = () => {
  //ambil id
  const token = localStorage.getItem("access_token");
  let id;
  if (token) {
    id = parseJwt(token).id;
  }
  const [detail, setDetail] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const {
    data,
    mutate: mutateData,
    isLoading,
  } = regularClassRepository.hooks.findRegClassByKitchen(id);
  console.log(data, "hallooo");

  const handleOK = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const modalDetailOpen = (record) => {
    setModalDetail(true);
    setDetail(record);
  };
  const modalDetailClose = () => {
    setModalDetail(false);
    mutateData()
  };
  interface DataType {
    key: string;
    courseName: string;
    theme: string;
  }
  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Kelas",
      dataIndex: "courseName",
      key: "courseName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Tema",
      dataIndex: "theme",
      key: "theme",
      render: (theme) => <p>{theme.name}</p>,
    },
    {
      title: "Chef",
      dataIndex: "theme",
      key: "chef",
      render: (chef) => <p>{chef.chef_name}</p>,
    },
    {
      title: "Aksi",
      key: "Aksi",
      render: (_, record) => (
        <Space size="middle">
          <UbahMateriBtn
            text="Lihat Detail"
            key={null}
            onclick={() => modalDetailOpen(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-20 w-full space-y-16">
      <div>
        <div className="float-right mr-3">
          <UbahMateriBtn text="Ajukan Kelas" key={null} onclick={handleOK} />
        </div>
        <p className="text-3xl font-bold">Kelas Regular</p>
      </div>
      {!isLoading && (
        <div>
          <Table
            columns={columns}
            dataSource={data.data}
            rowKey={(record) => record.key}
          />
          <ModalCustom
            width={1000}
            title={`Detail Kelas`}
            closeModal={modalDetailClose}
            visible={modalDetail}
            content={
              <DetailKelasRegular
              onClose={modalDetailClose}
                classData={detail}
                mutate={mutateData}
                usersData={detail}
              />
            }
          />
        </div>
      )}
      <ModalCustom 
      width={843}
      title="Pengajuan Kelas"
      closeModal={handleClose}
      visible={modalOpen}
      content={<FormPengajuanKelas onClose={handleClose} mutateData={mutateData}/>}/>
      <hr />
      <p className="text-3xl font-bold">Tema Kelas</p>
      <TemaKelas />
    </div>
  );
};
export default ListRegular;
