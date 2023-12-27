"use client";
import React, { useState } from "react";
import FullRoundedButton from "../../Component/fullRoundedButton";
import { MessageOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Input, Button, Card, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Regular = () => {
  const [judul, setJudul] = useState("Memasak di Kelas Private");
  const [temaPelatihan, setTemaPelatihan] = useState(
    "masak nusantara"
  );
  const [namaChef, setNamaChef] = useState("nazhwa");
  const [namaKitchenStudio, setNamaKitchenStudio] = useState("Dapur Rey");

  const menu = (
    <div className="flex">
      <Input
        placeholder="Link Youtube Belum diupload"
        // onClick={(e) => e.stopPropagation()}
      />
    </div>
  );

  const data = {
    namaKelas: "Baristanian Bandung",
    tema: "coffee latte",
    alamat: "Bandung",
    startDate: "26-12-2023",
    endDate: "29-12-2023",
    price: 200000,
    terisi: 2,
    availableBench: 4,
  };
  const router = useRouter();
  const token = localStorage.getItem("access_token")
  if (!token) {
    setTimeout(message.error('Anda belum login, silahkan login'), 2000);
    router.push('login');
  }

  return (
    <div className="flex w-[100%]">
      <div className=" p-10 min-h-screen w-[70%]">
        <div className="flex justify-between">
          <div>
            <div className=" text-2xl text-orange-400 font-bold">{judul}</div>
            <div className="py-4">{temaPelatihan}</div>
            <div>Chef: {namaChef}</div>
          </div>
          <div>
            <div className="text-2xl text-orange-400 font-bold">
              {namaKitchenStudio}
            </div>
            {/* <FullRoundedButton
              text="Hubungi Studio Masak"
              icons={<MessageOutlined />}
              type={"primary"}
            /> */}
          </div>
        </div>
        <div className=" mt-10 font-bold text-lg">Materi Kelas</div>

        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> Perkenalan
          </div>
        </Dropdown>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> Komposisi kopi
          </div>
        </Dropdown>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> Komposisi susu
          </div>
        </Dropdown>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> mixing
          </div>
        </Dropdown>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> Final day
          </div>
        </Dropdown>
        <div className="flex justify-between mt-8">
          <FullRoundedButton text="Ulasan" />
          <FullRoundedButton text="Unduh Sertifikat" />
        </div>
      </div>
      <div className=" py-4 mx-10">
        <Card
          title={data.namaKelas}
          // extra={<FullRoundedButton text="Lihat Detail" icons={null} type={"primary"} onclick={showModal} />}
          style={{ width: 300 }}
          className=""
        >
          <div className="flex justify-between">
            <div>
              <div>Tema: {data.tema}</div>
              <div>Kelas Private</div>
              <div>lokasi:</div>
              <p className=" text-xs">{data.alamat}</p>
              <div className=" text-xs">Dimulai pada:</div>
              <div className="text-xs">
                {data.startDate}-{data.endDate}
              </div>
              <div className=" font-bold text-lg mt-3">Cuma: {data.price}</div>
              <div className=" font-bold">
                Quota: {data.terisi}/{data.availableBench}
              </div>
            </div>
            <div className=" content-between">
              <Image
                className=" rounded"
                src="/assets/Image.png"
                width={40}
                height={40}
                alt="Gambar"
              />
            </div>
          </div>
        </Card>
      </div>{" "}
    </div>
  );
};

export default Regular;
