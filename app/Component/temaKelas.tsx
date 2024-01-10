"use client";

import { temaKelasRepository } from "#/repository/tema";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useState } from "react";
import ModalPengajuan from "./createPengajuan";
import FormPengajuanKelas from "./formPengajuan";
import TambahTema from "./material/modalTambahTema";
import UbahMateriBtn from "./buttonUbahMateri";
import { parseJwt } from "./Helper/convert";

export default function TemaKelas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [tema, setTema] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    if (token) {
      setId(parseJwt(token).id);
    }
  }, [token]);

  const { data, mutate: mutateData } =
    temaKelasRepository.hooks.findTemaByUsers(id);
  console.log(data);
  useEffect(() => {
    setTema(data?.data);
  });
  console.log(tema, "ini tema");
  const handleClick = (record: any) => {
    setSelectedTheme(record);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  interface DataType {
    key: string;
    name: string;
    chef_name: string;
    price: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Nama Tema",
      dataIndex: "name",
      key: "name",
      //   render: (text) => <a>{text}</a>,
    },
    {
      title: "Nama Chef",
      dataIndex: "chef_name",
      key: "chef_name",
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
    },
    // {
    //   title: 'Pilih Tema',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a onClick={() => handleClick(record)}>Ajukan Kelas {record.name}</a>
    //     </Space>
    //   ),
    // },
  ];
  return (
    <div>
      <div className=" flex justify-between pb-8">
        <div className="text-3xl font-bold">Tema Kelas</div>
          <UbahMateriBtn
            key={null}
            text="Tambah Tema Kelas"
            onclick={handleOpenModal}
          />
      </div>
      <Table className="mt-5 text-xl border border-solid border-primary rounded-sm" columns={columns} dataSource={tema} pagination={false} scroll={{y:200}}/>
      <ModalPengajuan
        title="pengajuan Kelas"
        closeModal={handleClose}
        visible={modalOpen}
        content={
          <FormPengajuanKelas onClose={handleClose} mutateData={mutateData} />
        }
      />
      <TambahTema
        open={openModal}
        closeModal={handleCloseModal}
        mutate={mutateData}
      />
    </div>
  );
}
