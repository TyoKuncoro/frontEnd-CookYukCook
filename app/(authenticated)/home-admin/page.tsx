"use client";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailKitchen from "#/app/Component/detailKitchen";
import RejectKitchen from "#/app/Component/rejectKitchen";
import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Image, Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

function HomeAdmin() {
  let status = "pending";
  const { data, mutate: mutateData } =
    kitchenRepository.hooks.getKitchenPending(status);
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [detail, setDetail] = useState();
  console.log(data?.data, "ini data cuy");
  interface DataType {
    key: string;
    users: string;
    logos: string;
  }
  const approve = async (idUsers, kitchenName) => {
    try {
      await usersRepository.manipulatedData.approveKitchen(idUsers);
      mutateData();
      message.success(`${kitchenName} telah disetujui`);
    } catch (e) {
      message.error("Gagal menyetujui studio masak");
    }
  };
  const handleOpen = (record) => {
    setShowModal(true);
    setDetail(record);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const showDetail = (record) => {
    setModalOpen(true);
    setDetail(record);
  };
  const showDetailClose = () => {
    setModalOpen(false);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Logo Studio Masak",
      dataIndex: "logos",
      key: "logos",
      render: (_, record) => (
        <Image
          width={80}
          height={80}
          src={`http://localhost:3222/kitchen-studio/upload-logo/${record.logos}/image`}
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
    {
      title: "No WhatsApp",
      dataIndex: "users",
      key: "phoneNumber",
      render: (phoneNumber) => <p>{phoneNumber.phoneNumber}</p>,
    },
    {
      title: "Detail",
      key: "detail",
      render: (_, record) => (
        <Space size="middle">
            {/* <a className="text-button hover:text-button hover:underline">Lihat Detail</a> */}
          <UbahMateriBtn
            key={record.key}
            onclick={() => showDetail(record)}
            text={"Lihat Detail"}
          />
        </Space>
      ),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space size="middle">
          <div className="w-30 flex gap-2 bg-blue-50 p-1 text-center rounded border-solid border border-green-600 hover:bg-blue-100 hover:text-blue-700 ">
            <a
              className="text-green-500 text-base font-semibold flex gap-2 hover:text-green-700"
              key={record.users.id}
              onClick={() => approve(record.users.id, record.users.name)}
            >
            <CheckOutlined className="text-green-500 hover:text-green-700" />
              Menyetujui
            </a>
          </div>

          <div className="w-30 flex gap-2 bg-red-50 p-1 text-center rounded border-solid border border-red-600 hover:bg-red-100 hover:text-red-700 ">
            <a
              className="text-red-500 text-base font-semibold flex gap-2 hover:text-red-700"
              key={record.users.id}
              onClick={() => handleOpen(record)}
            >
            <CloseOutlined className="text-red-500 hover:text-red-700" />
              Menolak
            </a>
          </div>
        </Space>
      ),
    },
  ];
  return (
    <div className="bg-white p-20 w-full space-y-16">
      <p className="text-2xl font-bold">Verifikasi Studio Masak</p>
      <Table columns={columns} dataSource={data?.data} />
      <ModalCustom
        width={450}
        title={"Menolak Studio Masak"}
        closeModal={handleClose}
        visible={showModal}
        content={
          <RejectKitchen
            onClose={handleClose}
            idUsers={detail?.users?.id}
            mutate={mutateData}
          />
        }
      />
      <ModalCustom
        width={600}
        title={`Detail Studio Masak ${detail?.users?.name}`}
        closeModal={showDetailClose}
        visible={modalOpen}
        content={<DetailKitchen idKitchen={detail?.id} />}
      />
    </div>
  );
}
export default HomeAdmin;
