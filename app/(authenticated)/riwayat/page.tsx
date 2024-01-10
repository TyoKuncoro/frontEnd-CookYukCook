"use client"

import React, { useState } from "react";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Tabs, message } from "antd";
import Image from "next/image";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";
import { parseJwt } from "#/app/Component/Helper/convert";
import RiwayatKitchen from "../riwayat-kitchen/page";
import { usersPaymentRepository } from "#/repository/usersPayment";
import { Span } from "next/dist/trace";
const { TabPane } = Tabs;

const Riwayat: React.FC = () => {
  const handleTabChange = (key: any) => {
    console.log("Tab changed:", key);
  };
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  const data = [
    {
      tanggal: "14-Des-2023",
      jenisKelas: "Kelas Regular",
      judul: "membuat Kue Enak",
      harga: 120000,
    },
    {
      tanggal: "15-Des-2023",
      jenisKelas: "Kelas Regular",
      judul: "Kue Lebaran Enak",
      harga: 120000,
    },
    {
      tanggal: "16-Des-2023",
      jenisKelas: "Kelas Regular",
      judul: "Kue Tahun Baru Enak",
      harga: 120000,
    },
  ];

  function onChange(pageNumber: any) {
    console.log("Halaman:", pageNumber);
    // Anda bisa menambahkan logika lainnya di sini, misalnya memuat data untuk halaman yang dipilih.
  }
  const router = useRouter();
  const token = localStorage.getItem("access_token")
  if (!token) {
    setTimeout(message.error('Anda belum login, silahkan login'), 2000);
    router.push('login');
  }

  let role: string = "";
  let id: string = "";
  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
    console.log(role, 'ini role');
  }

  const { data: dataPending } = usersPaymentRepository.hooks.getTraineeRegPending(id)
  // console.log(dataPending, 'ini data kelas Pending')
  const { data:dataApprove } = usersPaymentRepository.hooks.getTraineeRegApprove(id)
  // console.log(dataApprove, "ini data approve")

  const handleBayar = (data: any) => {
    console.log(data.id, "ini data id")
  }
   
  return role === 'Trainee' ?
    <div className="flex place-content-center ">
      <div className=" w-[85%] px-20 rounded-3xl"
      >
        <div className=" text-2xl my-6 font-bold">Riwayat Pembayaran</div>
        <Tabs
          defaultActiveKey="1"
          onChange={handleTabChange}
          className=" justify-between"
        >
          <TabPane tab="Belum Bayar" key="1">
            {dataPending?.data?.map((item: any, index: any) => (
              <div
                className="flex p-3 justify-between items-center rounded-lg my-3"
                style={{ border: "1px solid #FF7D04" }}
              >
                <div className="flex items-center ml-4">
                  <div className="">
                  <ClockCircleOutlined className="text-5xl text-red-600" />
                  </div>
                  <div className="ml-6">
                    <div className="text-xs">{item.createdAt.substring(0, 10)}</div>
                    <div className="text-lg font-bold">{!item.regular ? "Kelas Private" : "Kelas Regular"}</div>
                    <div className=" text-lg">{item.regular.courseName}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg"> {formatter.format(item.regular?.price - item.regular?.adminFee)}</div>
                  <FullRoundedButton text="Bayar" onclick={()=> handleBayar(item)} />
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
          <TabPane tab="Sudah Bayar" key="2">
            {dataApprove?.data?.map((item: any, index: any) => (
              <div
                className="flex p-3 justify-between items-center rounded-lg my-3"
                style={{ border: "1px solid #FF7D04" }}
              >
                <div className="flex items-center ml-4">
                  <div className="">
                  <CheckCircleOutlined className="text-5xl text-green-600" />
                  </div>
                  <div className="ml-6">
                    <div className="text-xs">{item.createdAt.substring(0, 10)}</div>
                    <div className="text-lg font-bold">{!item.regular ? "Kelas Private" : "Kelas Regular"}</div>
                    <div className=" text-lg">{item.courseName}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg">{formatter.format(item.regular.price - item.regular.adminFee)}</div>
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
    </div>
  : 
  <RiwayatKitchen />
};

export default Riwayat;
