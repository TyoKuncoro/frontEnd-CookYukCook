"use client"

import React, { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tabs, message } from "antd";
import Image from "next/image";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
const { TabPane } = Tabs;

const Riwayat: React.FC = () => {
  const handleTabChange = (key: any) => {
    console.log("Tab changed:", key);
  };

  const data = [
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
  const router = useRouter();
  if (!localStorage.getItem("access_token")) {
    message.error('Anda belum login, silahkan login')
    router.push('login');
  }

  return (
    <div className="flex place-content-center ">
      <div className=" w-[85%] px-20 rounded-3xl bg-orange-100">
        <div className=" text-2xl my-6 font-bold">Riwayat Pembayaran</div>
        <Tabs
          defaultActiveKey="1"
          onChange={handleTabChange}
          className=" justify-between"
        >
          <TabPane tab="Sedang Diproses" key="1">
            {data.map((item) => (
              <div
                className="flex p-3 justify-between items-center rounded-lg my-3"
                style={{ border: "1px solid #FF7D04" }}
              >
                <div className="flex items-center ml-4">
                  <div className="">
                    <Image
                      src="/assets/ClockCircleOutlined.png"
                      width={50}
                      height={50}
                      alt="clock"
                    />
                  </div>
                  <div className="ml-6">
                    <div className="text-xs">{item.tanggal}</div>
                    <div className="text-lg font-bold">{item.jenisKelas}</div>
                    <div className=" text-lg">{item.judul}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">Rp. {item.harga}</div>
                  {/* <FullRoundedButton text="Lihat Detail" /> */}
                </div>
              </div>
            ))}
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={onChange}
              className="flex justify-center pt-48 pb-12"
            />
          </TabPane>
          <TabPane tab="Berhasil" key="2">
            {data.map((item) => (
              <div
                className="flex p-3 justify-between items-center rounded-lg my-3"
                style={{ border: "1px solid #FF7D04" }}
              >
                <div className="flex items-center ml-4">
                  <div className="">
                    <Image
                      src="/assets/CheckCircleOutlined.png"
                      width={50}
                      height={50}
                      alt="clock"
                    />
                  </div>
                  <div className="ml-6">
                    <div className="text-xs">{item.tanggal}</div>
                    <div className="text-lg font-bold">{item.jenisKelas}</div>
                    <div className=" text-lg">{item.judul}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">Rp. {item.harga}</div>
                  {/* <FullRoundedButton text="Lihat Detail" /> */}
                </div>
              </div>
            ))}
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={onChange}
              className="flex justify-center pt-48 pb-12"
            />
          </TabPane>
          <TabPane tab="Gagal" key="3">
            {/* Konten untuk status "Gagal" */}
            {data.map((item) => (
              <div
                className="flex p-3 justify-between items-center rounded-lg my-3"
                style={{ border: "1px solid #FF7D04" }}
              >
                <div className="flex items-center ml-4">
                  <div className="">
                    <Image
                      src="/assets/solar_danger-circle-outline.png"
                      width={50}
                      height={50}
                      alt="clock"
                    />
                  </div>
                  <div className="ml-6">
                    <div className="text-xs">{item.tanggal}</div>
                    <div className="text-lg font-bold">{item.jenisKelas}</div>
                    <div className=" text-lg">{item.judul}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">Rp. {item.harga}</div>
                  {/* <FullRoundedButton text="Lihat Detail" /> */}
                </div>
              </div>
            ))}
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={onChange}
              className="flex justify-center pt-48 pb-12"
            />

          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Riwayat;
