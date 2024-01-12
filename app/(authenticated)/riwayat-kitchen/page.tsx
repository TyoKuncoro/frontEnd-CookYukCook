"use client";
import React, { useState } from "react";
import WeekPickerComponent from "../../Component/Wpicker/page";
import MonthPickerComponent from "#/app/Component/Mpicker/page";
import { Button, Dropdown, Empty, Form, Select } from "antd";
import { MenuProps, Tabs, Modal } from "antd";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { CheckCircleOutlined, ClockCircleOutlined, PrinterOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Pagination } from "antd";
import { regularClassRepository } from "#/repository/regularClass";
import { parseJwt } from "#/app/Component/Helper/convert";
import { useRouter } from "next/navigation";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailPembayaran from "#/app/Component/modalDetailPembayaran";
import { usersPaymentRepository } from "#/repository/usersPayment";

const { TabPane } = Tabs;
const { Option } = Select;

const RiwayatKitchen: React.FC = () => {
  const [detail, setDetail] = useState()
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpen = (record) => {
    setModalOpen(true)
    setDetail(record)
  };
  const handleClose = () => {
    setModalOpen(false)
  }
  const handleTabChange = (key: any) => {
    console.log("Tab changed:", key);
  };
  const router = useRouter();



  function onChange(pageNumber: any) {
    console.log("Halaman:", pageNumber);
    // Anda bisa menambahkan logika lainnya di sini, misalnya memuat data untuk halaman yang dipilih.
  }


  const token = localStorage.getItem("access_token");
  let id: string = "";
  if (token) {
    id = parseJwt(token).id;
    console.log(id, "id");
  }
  const { data: dataKelasPending } = usersPaymentRepository.hooks.getPengajuanPending(id);
  console.log(dataKelasPending, "Data Kelas Pending")
  const { data: dataKelas } = usersPaymentRepository.hooks.getPengajuanApprove(id);

  console.log(dataKelas, "Data Kelas");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true); 
  };

  const handleModalBayar = (data: any) => {
    // console.log(data.id, "ini data bayar")
    localStorage.setItem("idKelas", data.id)
    router.push("/pembayaran");
  }
  return (
    <div>
      <Modal
        title="Print Data Pemabayaran"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <div>Ingin Print Data Pembayaran Bulan Desember ?</div>
        <FullRoundedButton text="Export Data" />
      </Modal>
      <div className="text-2xl font-bold">Riwayat Pembayaran</div>
      {/* <div className="flex justify-between">
        <div className="flex">
          <WeekPickerComponent />
          <div> atau </div>
          <MonthPickerComponent />
          <Select placeholder="Status">
            <Option value="berhasil">Berhasil</Option>
            <Option value="gagal">Gagal</Option>
          </Select>
          <FullRoundedButton text="Terapkan" />
        </div>
        <FullRoundedButton
          text="Print"
          icons={<PrinterOutlined />}
          onclick={showModal}
        />
      </div>
      <div
        className="flex justify-between border-4"
        style={{ borderTop: "1px solid", borderBottom: "1px solid" }}
      >
        <div className="text-lg font-bold ">Waktu dan Tanggal</div>
        <div className="text-lg font-bold pr-[6%]">Nama Kelas</div>
        <div className="text-lg font-bold">Harga</div>
      </div>
      {data.map((item, index) => {
        return (
          <div
            className="flex justify-between py-2"
            style={{ borderBottom: "1px solid " }}
          >
            <div>{item.tanggal}</div>
            <div>{item.judul}</div>
            <div>{item.harga}</div>
          </div>
        );
      })} */}

      <Tabs
        defaultActiveKey="1"
        onChange={handleTabChange}
        className=" justify-between"
      >
        <TabPane key="1" tab="Belum Bayar">
          {dataKelasPending?.data?.length === 0 ? (
            <Empty
            className="flex flex-col justify-center items-center mt-40"
              imageStyle={{ width: 300 , margin:"auto"}}
              image={"/assets/Audit-amico.png"}
              description={<span>Belum ada transaksi</span>}
            />
          ):(
            <div>

              {dataKelasPending?.data?.map((item: any) => (
                <div
                  className="flex p-3 justify-between items-center rounded-lg my-3"
                  style={{ border: "1px solid #FF7D04" }}
                >
                  <div className="flex items-center ml-4"> 
                    <div className="">
                      <ClockCircleOutlined className="text-5xl text-orange-500" />
                      {/* <Image
                        src="/assets/CheckCircleOutlined.png"
                        width={50}
                        height={50}
                        alt="clock"
                      /> */}
                    </div>
                    <div className="ml-6">
                      <div className="text-xs">{item.createdAt.substring(0, 10)}</div>
                      <div className="text-lg font-bold">Kelas Regular</div>
                      <div className=" text-lg">{item.regular.courseName}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Rp. {item.regular.adminFee}</div>
                    <FullRoundedButton text="Bayar" key={item.id} onclick={() => handleModalBayar(item)}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* <Pagination
            defaultCurrent={1}
            total={50}
            onChange={onChange}
            className="flex justify-center pt-48 pb-12"
          /> */}
        </TabPane>
        <TabPane key="2" tab="Sudah Bayar">
          {dataKelas?.data?.length === 0 ? (
            <Empty
            className="flex flex-col justify-center items-center mt-40"
              imageStyle={{ width: 300 , margin:"auto"}}
              image={"/assets/Audit-amico.png"}
              description={<span>Belum ada transaksi yang selesai</span>}
            />
          ):(
            <div>

              {dataKelas?.data?.map((item: any, index: any) => (
                <div
                  className="flex p-3 justify-between items-center rounded-lg my-3"
                  style={{ border: "1px solid #FF7D04" }}
                >
                  <div className="flex items-center ml-4"> 
                    <div className="">
                      <CheckCircleOutlined className="text-5xl text-green-600" />
                      {/* <Image
                        src="/assets/CheckCircleOutlined.png"
                        width={50}
                        height={50}
                        alt="clock"
                      /> */}
                    </div>
                    <div className="ml-6">
                      <div className="text-xs">{item.createdAt.substring(0, 10)}</div>
                      <div className="text-lg font-bold">Kelas Regular</div>
                      <div className=" text-lg">{item.regular.courseName}</div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">Rp. {item.regular.adminFee}</div>
                    <FullRoundedButton text="Lihat Detail" onclick={() => handleOpen(item)}/>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ModalCustom
          title={"Detail Riwayat Transaksi"}
          width={500}
          closeModal={handleClose}
          visible={modalOpen}
          content={<DetailPembayaran dataApprove={detail}/>}
          />
          {/* <Pagination
            defaultCurrent={1}
            total={50}
            onChange={onChange}
            className="flex justify-center pt-48 pb-12"
          /> */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default RiwayatKitchen;
