"use client";

import React, { useEffect, useState } from "react";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import FormPengajuanKelas from "#/app/Component/formPengajuan";
import TemaKelas from "#/app/Component/temaKelas";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailKelasRegular from "#/app/Component/modalDetailKelas";
import { SendOutlined } from "@ant-design/icons";
import { kitchenRepository } from "#/repository/kitchen";

const ListRegular = () => {
  //ambil id
  const token = localStorage.getItem("access_token");
  let role;
  let id;
  if (token) {
    id = parseJwt(token).id;
    role = parseJwt(token).role;
  }
  console.log(id, "halo ini id ku")
  const { data: dataUser } = kitchenRepository.hooks.getKitchenByUser();

  const [detail, setDetail] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  
  if (role !== "Admin"){
    var {data, mutate: mutateData,isLoading} = regularClassRepository.hooks.findRegClassByKitchen(id);
  } else {
    var {data, mutate: mutateData,isLoading} = regularClassRepository.hooks.findAllRegularClass();
  }
  console.log(data, "data regular ");

  const handleOK = () => {
    if(dataUser?.data?.users?.status === "pending"){
      message.error("Mohon tunggu konfirmasi akun dari admin")
    }else if(dataUser?.data?.users?.status === "active"){
      setModalOpen(true);
    }
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const modalDetailOpen = (record: any) => {
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

  const columnsAdmin: ColumnsType<DataType> = [
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
  ];
  return (
    <div className="bg-white px-20 w-full space-y-16 overflow-auto">
      {/* <TemaKelas />
      <hr /> */}
      <div>
        <div className="float-right mr-3">
          {/* <UbahMateriBtn text={"Ajukan Kelas"} icon={<SendOutlined/>} key={null} onclick={handleOK} /> */}
        </div>
        <p className="text-3xl font-bold"> Kelas Regular {role == "Admin" && "Tersedia"}</p>
      </div>
      {!isLoading && (
        <div>
          <Table
            columns={role == "Admin" ? columnsAdmin :columns}
            dataSource={data.data}
            rowKey={(record) => record.key}
          />
          <ModalCustom
            width={1000}
            title={'Detail Kelas'}
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
    </div>
  );
};
export default ListRegular;

