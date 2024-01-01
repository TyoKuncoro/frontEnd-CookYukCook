"use client";
import DetailKitchen from "#/app/Component/DetailKitchen";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ModalCustom from "#/app/Component/createPengajuan";
import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import { Image, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

function HomeAdmin() {
  const status = "pending";
  const { data } = kitchenRepository.hooks.getKitchenPending(status);
  console.log(data?.data, "halo");
  const [modalDetail, setModalDetail] = useState(false);
  const [selectedKitchen, setSelectedKitchen] = useState();
  const openModal = (record) => {
    setModalDetail(true)
    setSelectedKitchen(record)
  }
  const closeModal = () => {
    setModalDetail(false)
  }
  interface DataType {
    key: string;
    id:string;
    users: string;
    legality: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Foto Legalitas",
      dataIndex: "legality",
      key: "legality",
      render: (_, record) => (
        <Image
          width={50}
          src={`http://localhost:3222/kitchen-studio/upload-legalitas/${record.legality}/image`}
        />
      ),
    },
    {
      title: "Nama Studio Masak",
      dataIndex: "users",
      key: "users",
      render: (users) => <p>{users.name}</p>,
    },

    {
      title: "Alamat",
      dataIndex: "users",
      key: "address",
      render: (address) => <p>{address.address}</p>,
    },
    // {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    {
      title: "No WhatsApp",
      dataIndex: "users",
      key: "phoneNumber",
      render: (phoneNumber) => <p>{phoneNumber.phoneNumber}</p>,
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space size="middle">
          <UbahMateriBtn key={record.key} onclick={() => openModal(record)} text={'Lihat Detail'}/>
          {/* <a>Invite {record.users.name}</a>
          <a>Delete</a> */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data?.data} />
      <ModalCustom
      width={500}
      title={'Detail Studio Masak'}
      visible={modalDetail}
      closeModal = {closeModal}
      content = {<DetailKitchen idKitchen={selectedKitchen?.id}/>}
      />
    </div>
  );
}
export default HomeAdmin;
