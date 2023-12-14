"use client";
import React, { useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import Image from "next/image";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
const { TabPane } = Tabs;

const Riwayat: React.FC = () => {
  const handleTabChange = (key: any) => {
    console.log("Tab changed:", key);
  };

  const data = {
    tanggal: "14-Des-2023",
    jenisKelas: "Kelas Regular",
    judul: "membuat Kue Enak",
    harga: "120000",
  };
  return (
    <div className="flex place-content-center ">
      <div className="bg-red-200 w-[85%] px-20 rounded-3xl">
        <div className=" text-2xl my-6 font-bold">Riwayat Pembayaran</div>
        <Tabs
          defaultActiveKey="1"
          onChange={handleTabChange}
          className=" justify-between"
        >
          <TabPane tab="Sedang Diproses" key="1">
            Konten untuk status "Sedang Diproses"
            <div className="flex p-3 justify-between border-orange-400 border-4 items-center">
              <div className="flex items-center ">
                <div className="">
                  <Image
                    src="/assets/ClockCircleOutlined.png"
                    width={50}
                    height={50}
                    alt="clock"
                  />
                </div>
                <div className="ml-6">
                  <div className="text-xs">{data.tanggal}</div>
                  <div className="text-lg font-bold">{data.jenisKelas}</div>
                  <div className=" text-lg">{data.judul}</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg">Rp. {data.harga}</div>
                {/* <FullRoundedButton text="Lihat Detail" /> */}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Berhasil" key="2">
            Konten untuk status "Berhasil"
          </TabPane>
          <TabPane tab="Gagal" key="3">
            Konten untuk status "Gagal"
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Riwayat;
