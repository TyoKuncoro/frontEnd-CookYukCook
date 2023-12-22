"use client";
import React, { useState } from "react";
import FullRoundedButton from "../../Component/fullRoundedButton";
import { MessageOutlined, DownOutlined, DownloadOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Input, Button, Card, message, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ListRegular from "../regular-kitchen/page";
import { parseJwt } from "#/app/Component/Helper/convert";
import TextArea from "antd/es/input/TextArea";

const Regular = () => {
  const [judul, setJudul] = useState("Masak Masakan Rakyat  ");
  const [temaPelatihan, setTemaPelatihan] = useState("makanan jakarta");
  const [namaChef, setNamaChef] = useState("nazhwa");
  const [namaKitchenStudio, setNamaKitchenStudio] = useState("Dapur Rey");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const menu = (
    <div className="flex">
      <Input
        placeholder="Link Youtube Belum diupload"
        // onClick={(e) => e.stopPropagation()}
      />
    </div>
  );

  const data = {
    namaKelas: "Nusantara",
    tema: "makanan khas jawa",
    alamat: "Malang",
    startDate: "26-01-2024",
    endDate: "29-01-2024",
    price: 120000,
    terisi: 2,
    availableBench: 4,
  };
  const router = useRouter();
  const token = localStorage.getItem("access_token");
  if (!token) {
    message.error("Anda belum login, silahkan login");
    router.push("login");
  }
  let role: string = "";
  if (token) {
    role = parseJwt(token).role;
    console.log(role, "role coook");
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const [textValue, setTextValue] = useState("");

  const handleTextChange = (e:any) => {
    setTextValue(e.target.value);
  };

  const submit = () => {
    message.success("Button hitted");
  };

  const [modalSertifikat, setModalSertifikat] = useState(false);
  const openSertifikat = () => {
    setModalSertifikat(true);
  };
  const cancelSertifikat = () =>{
    setModalSertifikat(false);
  }

  return role === "Trainee" ? (
    <div className="flex w-[100%]">
      <Modal
        title="Ulasan"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <TextArea rows={4} value={textValue} onChange={handleTextChange} />
        <FullRoundedButton text="Kirim" onclick={submit} />
      </Modal>
      <Modal
        title="Sertifikatku"
        open={modalSertifikat}
        // onOk={handleOk}
        onCancel={cancelSertifikat}
        footer={null}
      >
        <div className="flex py-6 justify-center">
          <Image
            src="/assets/maskot.png"
            width={150}
            height={150}
            alt="Cook Yuk Cook"
          />
        </div>
        <FullRoundedButton text="Unduh Sertifikat" icons={<DownloadOutlined />} />
      </Modal>
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
            <DownOutlined /> karakteristik kondimen
          </div>
        </Dropdown>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> gado gado bumbu tipis
          </div>
        </Dropdown>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div
            className=" py-4 rounded pl-2 mt-4 text-white bg-orange-400"
            onClick={(e) => e.preventDefault()}
          >
            <DownOutlined /> ketoprak
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
          <FullRoundedButton text="Ulasan" onclick={openModal} />
          <FullRoundedButton text="Unduh Sertifikat" onclick={openSertifikat} />
        </div>
      </div>
      <div className=" py-4 mx-10">
        <Card
          title={data.namaKelas}
          // extra={<FullRoundedButton text="Lihat Detail" icons={null} type={"primary"} onclick={showModal} />}
          style={{ width: 300 }}
          className="bg-orange-300"
        >
          <div className="flex justify-between">
            <div>
              <div>Tema: {data.tema}</div>
              <div>Kelas Regular</div>
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
  ) : (
    <ListRegular />
  );
};

export default Regular;
