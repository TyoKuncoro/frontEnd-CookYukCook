import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import { Image, message } from "antd";
import ModalCustom from "./createPengajuan";
import RejectKitchen from "./rejectKitchen";
import { useState } from "react";

function DetailKitchen({ idKitchen,onclose, mutate }: any) {
  console.log(idKitchen, "HAI");
  const { data: dataKitchen } =
    kitchenRepository.hooks.getKitchenById(idKitchen);
  console.log(dataKitchen?.data, "yap yap");
  const [modalOpen, setModalOpen] = useState(false);
  const [detailKitchen, setDetailKitchen] = useState();
  console.log(detailKitchen, "detail");
  const handleOpen = (record) => {
    setModalOpen(true);
    setDetailKitchen(record);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const approve = async ({idUsers, kitchenName}: any) => {
    try {
      await usersRepository.manipulatedData.approveKitchen(idUsers);
      message.success(`${kitchenName} telah disetujui `);
      mutate()
      onclose()
    } catch (e) {
      message.error("Gagal Menyetujui Kitchen");
    }
  };
  return (
    <div className="flex text-start justify-center">
      <div>
        <div className=" w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center shadow">
          <Image
            width={100}
            height={100}
            className="rounded-full shadow-md"
            src={`http://localhost:3222/kitchen-studio/upload-logo/${dataKitchen?.data?.logos}/image`}
          />
          {/* <p className=" mt-2 text-base font-semibold">{dataKitchen?.data?.users?.name}</p> */}
        </div>
      </div>
      <div className="ml-3 p-1">
        <p className="text-2xl font-semibold">
          {dataKitchen?.data?.users?.name}
        </p>
        <div className="flex">
          <p className="font-medium text-base mr-16">Email</p>
          <p>: {dataKitchen?.data?.users?.email}</p>
        </div>
        <div className="flex">
          <p className="font-medium text-base mr-1">No WhatsApp</p>
          <p>: {dataKitchen?.data?.users?.phoneNumber}</p>
        </div>
        <div className="flex">
          <p className="font-medium text-base mr-14">Alamat</p>
          <p>: {dataKitchen?.data?.users?.address}</p>
        </div>
        <div className="flex">
          <p className="font-medium text-base mr-5">Jumlah Chef</p>
          <p>
            : {dataKitchen?.data?.numberOfChefs} <b>orang</b>
          </p>
        </div>
        <div className="flex">
          <p className="font-medium text-base mr-11">Deskripsi</p>
          <p>: {dataKitchen?.data?.description}</p>
        </div>
        <div className="flex">
          <p className="text-base font-medium mr-12">Legalitas</p>
          <p className="mr-1">:</p>
          <Image
            width={100}
            height={100}
            src={`http://localhost:3222/kitchen-studio/upload-legalitas/${dataKitchen?.data?.legality}/image`}
          />
        </div>
        <div className="flex gap-6 mt-6 float-right">
          <a
            className="text-blue-500 text-base font-semibold hover:text-blue-700"
            onClick={() => approve(dataKitchen?.data?.users?.id)}
          >
            Menyetujui
          </a>
          <a
            className="text-red-500 text-base font-semibold hover:text-red-700"
            onClick={() => handleOpen(dataKitchen?.data?.users?.id)}
          >
            Menolak
          </a>
          <ModalCustom
            width={600}
            title={"Alasan Menolak Studio Masak"}
            closeModal={handleClose}
            visible={modalOpen}
            content={
              <RejectKitchen
                onClose={handleClose}
                idUsers={dataKitchen?.data?.users?.id}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
export default DetailKitchen;
