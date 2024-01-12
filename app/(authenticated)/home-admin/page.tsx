"use client";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailKitchen from "#/app/Component/detailKitchen";
import RejectKitchen from "#/app/Component/rejectKitchen";
import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import {
  CheckOutlined,
  CloseOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Card, Empty, Image, Space, Table, message } from "antd";
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
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space size="middle" className="flex flex-col">
          <div className="w-[113px] flex gap-2 bg-orange-50 p-1 text-center items-center justify-center rounded border-solid border border-orange-600 hover:bg-blue-100 hover:text-orange-700 ">
            <a
              className="text-orange-500 text-base text-center font-semibold flex gap-2 hover:text-orange-700"
              key={record.key}
              onClick={() => showDetail(record)}
            >
              <FileSearchOutlined  className="text-orange-500 hover:text-orange-700" />
              Detail
            </a>
          </div>

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

          <div className="w-[113px] flex gap-2 bg-red-50 p-1 items-center justify-center text-center rounded border-solid border border-red-600 hover:bg-red-100 hover:text-red-700 ">
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
    <div className="bg-white px-3 py-4 w-full">
      <p className="text-2xl font-bold">Verifikasi Studio Masak</p>
      <Table className="overflow-hidden" columns={columns} dataSource={data?.data} pagination={false} scroll={{y:300}}/>
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
      <div className="flex flex-col w-full mt-10 rounded-md border border-solid border-button p-3">
        <div className="mb-4">
          <p className="text-2xl font-bold">Kelas Regular</p>
          <div className="flex gap-3 items-center justify-center">
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="">
          <p className="text-2xl font-bold">Kelas Privat</p>
          <div className="flex gap-3 items-center justify-center">
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
            <Card title="Kelas Memasak Makanan Simple" className="w-[370px] h-54 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-base">Tema: Memasak Nasi</p>
                  <div className="text-base">Dimulai pada: </div>
                  <div className="text-base">2024-01-09 sampai 2024-01-14</div>
                  <p className="text-base font-semibold">Kuota: 10 orang</p>
                </div>
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={80}
                  height={80}
                  alt="Gambar"
                />
              </div>
            </Card>
          </div>
          <div>
            {/* <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>Kelas Regular Masih Kosong</span>}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;
