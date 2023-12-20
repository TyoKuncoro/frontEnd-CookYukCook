"use client";

import React, { useState } from "react";
import { Calendar} from "antd";
import Image from "next/image";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { PrinterOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";

const HomeKitchen: React.FC = () => {
  const [tema, setTema] = useState("Judul Tema");
  const [startDate, setStartDate] = useState("tanggal mulai");
  const [endDate, setEndDate] = useState("tanggal selesai");

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [variableKelas, setVariableKelas] = useState('')

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };
  const data = {
    Chef: "Nazhwa",
    Trainee: "user2000",
  };
  const kelas = [
    {
      jenisKelas: "Regular",
      judul: "membuat tawar roti",
      tema: "memanggang roti",
    },
    {
      jenisKelas: "Regular",
      judul: "membuat kue khas lebaran",
      tema: "kue kering",
    },
    {
      jenisKelas: "Private",
      judul: "Bolu mumer",
      tema: "pembuatan kue",
    },
  ];

  const kelasPengajuan = [
    "Chinese main dish",
    "Sweet europe",
    "international cuisine",
  ];

  const showExport = () => {
    console.log("modal dibuka");
  };
  const openModal = () => {
    console.log("pengajuan kelas");
  };

  const editKelas = (event: any) =>{
    console.log(event.key)
  }
  return (
    <div>
      <div className="text-2xl font-semibold">Jadwal</div>
      <div className="flex">
        <div className=" w-[50%] mx-10 ">
          <Calendar
            fullscreen={false}
            onSelect={handleDateSelect}
            className="bg-orange-300"
          />
        </div>
        <div className=" bg-orange-100 w-[100%] rounded-3xl">
          <div
            className="px-8 py-4 bg-orange-400 rounded-tl-3xl rounded-br-3xl"
            style={{
              marginRight: "75%",
            }}
          >
            Pilihan Untukmu
          </div>
          <div className=" py-4 mx-10">
            <div
              style={{ width: 300 }}
              className="bg-orange-300 rounded-lg p-6"
            >
              <div className=" content-between ">
                <Image
                  className=" rounded"
                  src="/assets/Image.png"
                  width={250}
                  height={175}
                  alt="Gambar"
                />
                <div className="flex justify-between">
                  <div>
                    <div className="text-xl font-bold">Tema: {tema}</div>
                    <div className=" font-bold">Dimulai pada:</div>
                    <div className="font-bold">
                      {startDate}-{endDate}
                    </div>

                    <div>Kelas Private</div>
                    <div className="mt-2">Chef {data.Chef}</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Trainee {data.Trainee}</div>
                  <FullRoundedButton
                    text="Lihat Detail"
                    icons={null}
                    type={"primary"}
                    //   onclick={showModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <p>Selected Date: {selectedDate}</p> */}
      <div className="flex mt-3">
        <div className="w-[50%] bg-orange-300 rounded mr-20">
          {kelas.map((item, index) => (
            <div
              key={index}
              className="rounded-xl flex justify-between m-3 p-5 bg-white"
              style={{ border: "2px solid #FF7D04" }}
            >
              <div>
                <div
                  className={`text-xl font-bold ${
                    item.jenisKelas === "Regular"
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  Kelas {item.jenisKelas}
                </div>
                <div>{item.judul}</div>
                <div>Tema: {item.tema}</div>
                {item.jenisKelas === "Regular" && (
                  <div
                    className="font-semibold text-orange-500 mt-2"
                    // onClick={showExport}
                  >
                    <PrinterOutlined onClick={() => console.log('chat')} /> export
                  </div>
                )}
              </div>
              <div className="mt-4">
                <FullRoundedButton text="Lihat Kelas" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-orange-100 h-80 w-[100%] rounded-3xl">
          <div className=" flex justify-between">
            <div className="font-semibold bg-orange-400 text-2xl py-2 rounded-tl-3xl rounded-br-3xl pl-8 pr-20">
              Kelas Dalam Pengajuan
            </div>
            <FullRoundedButton text="Ajukan Kelas" icons={<SendOutlined />} />
          </div>
          <div className="mt-12">
            {kelasPengajuan.map((item, index) => (
              <div key={index} className="flex justify-between mx-32 bg-white p-3 rounded-lg my-1 text-lg">
                <div>{item}</div>
                <div>
                  <EditOutlined onClick={()=>setVariableKelas(item)}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeKitchen;
