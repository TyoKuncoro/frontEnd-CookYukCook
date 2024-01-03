"use client";

import React, { useEffect, useState } from "react";
import { CollapseProps } from "antd/lib";
import ListKelasRegular from "#/app/Component/listKelasRegular";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ListTrainee from "#/app/Component/listTrainee";
// import ModalPengajuan from "#/app/Component/createPengajuan";
// import TambahMateri from "#/app/Component/material/formTambahMateri";
// import UbahMateri from "#/app/Component/material/modalUbahMateri";
import FormPengajuanKelas from "#/app/Component/formPengajuan";
import TemaKelas from "#/app/Component/temaKelas";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
// import { materiRepository } from "#/repository/materi";
// import CreateMateriModal from "#/app/Component/material/formTambahMateri";
import { Button, Modal, Space, Table } from "antd";
// import FormUbahPengajuan from "#/app/Component/formUbahPengajuan";
import UbahPengajuan from "#/app/Component/modalUbahPengajuan";
import { ColumnsType } from "antd/es/table";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailKelasRegular from "#/app/Component/modalDetailKelas";
import { SendOutlined } from "@ant-design/icons";
// import { mutate } from "swr";

const ListRegular = () => {
  //ambil id
  const token = localStorage.getItem("access_token");
  let id;
  if (token) {
    id = parseJwt(token).id;
  }
  console.log(id, "halo ini id ku")
  const [detail, setDetail] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const {data, mutate: mutateData,isLoading} = regularClassRepository.hooks.findRegClassByKitchen(id);
  console.log(data, "data regular ");

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
          <UbahMateriBtn text={"Ajukan Kelas"} icon={<SendOutlined/>} key={null} onclick={handleOK} />
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
      <hr />
      <p className="text-3xl font-bold">Tema Kelas</p>
      <TemaKelas />
    </div>
  );
};
export default ListRegular;

// return (
//   <div className="bg-white p-20 w-full space-y-16">
//     <div>
//       <div className="float-right mr-3">
//         <UbahMateriBtn onclick={handleOK} text="Ajukan Kelas" key={null} 
//         // onclick={handleOK}
//         />
//       </div>
//       <p className="text-3xl font-bold">Kelas Regular</p>
//     </div>
//     {!isLoading && (
//       <div>
//         {data?.data?.map((items: any) => {
//           return (
//             <div key={items.id}>
//               <div className="flex justify-between">
//                 <div className=" space-y-0">
//                   <p className="text-4xl font-bold">{items?.courseName}</p>
//                   <p className="text-2xl">Tema: {items?.theme?.name}</p>
//                   <p className="text-xl">Chef: {items?.theme?.chef_name}</p>
//                   {/* <FormUbahPengajuan idClass={items.id} /> */}
//                   <UbahPengajuan idClass={items.id} />
//                 </div>
//               </div>

//               <div className="flex w-full gap-52">
//                 <div>
//                   <div className="flex justify-between">
//                     <p className="text-3xl font-bold">Materi Kelas</p>
//                     <UbahMateriBtn
//                       text="Tambah Materi"
//                       key={null}
//                       onclick={() =>showModal(items?.id, "Regular Class")}
//                     />
//                   </div>
//                   <div className="div-list w-[1020px] h- p-2 rounded-lg">
//                     <ListKelasRegular classData={items} mutate={mutateData} />
//                   </div>
//                 </div>
//                 <div>
//                   {items.usersPay && items.usersPay.length > 0 && (
//                     <ListTrainee usersData={items} />
//                   )}
//                 </div>
//               </div>
//               <hr />
//             </div>
//           );
//         })}
//         <Table
//           columns={columns}
//           dataSource={data.data}
//           rowKey={(record) => record.key}
//         />
//         <ModalCustom
//           width={1000}
//           title={`Detail Kelas`}
//           closeModal={modalDetailClose}
//           visible={modalDetail}
//           content={
//             <DetailKelasRegular
//             onClose={modalDetailClose}
//               classData={detail}
//               mutate={mutateData}
//               usersData={detail}
//             />
//           }
//         />
//       </div>
//     )}
//     <ModalCustom 
//     width={843}
//     title="Pengajuan Kelas"
//     closeModal={handleClose}
//     visible={modalOpen}
//     content={<FormPengajuanKelas onClose={handleClose} mutateData={mutateData}/>}/>
//     <hr />
//     <p className="text-3xl font-bold">Tema Kelas</p>
//     <TemaKelas />
//   </div>
// );