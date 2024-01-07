"use client";
import React, { useState } from "react";
import WeekPickerComponent from "../../Component/Wpicker/page";
import MonthPickerComponent from "#/app/Component/Mpicker/page";
import { Button, Dropdown, Form, Select } from "antd";
import { MenuProps, Tabs, Modal } from "antd";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { CheckCircleOutlined, PrinterOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Pagination } from "antd";
import { regularClassRepository } from "#/repository/regularClass";
import { parseJwt } from "#/app/Component/Helper/convert";
import { useRouter } from "next/navigation";

const { TabPane } = Tabs;
const { Option } = Select;

const RiwayatKitchen: React.FC = () => {
  const handleTabChange = (key: any) => {
    console.log("Tab changed:", key);
  };
  const router = useRouter();


  const data1 = [
    {
      tanggal: "14-Des-2023",
      jenisKelas: "Kelas Regular",
      judul: "membuat Kue Enak",
      harga: "120000",
    },
    {
      tanggal: "15-Des-2023",
      jenisKelas: "Kelas Regular",
      judul: "Kue Lebaran Enak",
      harga: "120000",
    },
    {
      tanggal: "16-Des-2023",
      jenisKelas: "Kelas Regular",
      judul: "Kue Tahun Baru Enak",
      harga: "120000",
    },
  ];

  function onChange(pageNumber: any) {
    console.log("Halaman:", pageNumber);
    // Anda bisa menambahkan logika lainnya di sini, misalnya memuat data untuk halaman yang dipilih.
  }

  const data = [
    {
      tanggal: "27 Nov 2023",
      judul: "Membuat Roti Tawar",
      harga: 1200000,
    },
    {
      tanggal: "27 Nov 2023",
      judul: "Membuat Roti Tawar",
      harga: 1200000,
    },
    {
      tanggal: "27 Nov 2023",
      judul: "Membuat Roti Tawar",
      harga: 1200000,
    },
    {
      tanggal: "27 Nov 2023",
      judul: "Membuat Roti Tawar",
      harga: 1200000,
    },
    {
      tanggal: "27 Nov 2023",
      judul: "Membuat Roti Tawar",
      harga: 1200000,
    },
  ];

  const token = localStorage.getItem("access_token");
  let id: string = "";
  if (token) {
    id = parseJwt(token).id;
    console.log(id, "id");
  }
  const { data: dataKelasPending } = regularClassRepository.hooks.findRegClassByKitchenPending(id);
  console.log(dataKelasPending, "Data Kelas Pending")
  const { data: dataKelas } = regularClassRepository.hooks.findRegClassByKitchen(id);
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
          {dataKelasPending?.data?.map((item: any) => (
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
                  <div className=" text-lg">{item.courseName}</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg">Rp. {item.adminFee}</div>
                <FullRoundedButton text="Bayar" onclick={() => handleModalBayar(item)}/>
              </div>
            </div>
          ))}
          {/* <Pagination
            defaultCurrent={1}
            total={50}
            onChange={onChange}
            className="flex justify-center pt-48 pb-12"
          /> */}
        </TabPane>
        <TabPane key="2" tab="Sudah Bayar">
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
                  <div className=" text-lg">{item.courseName}</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg">Rp. {item.adminFee}</div>
                {/* <FullRoundedButton text="Lihat Detail" /> */}
              </div>
            </div>
          ))}
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
