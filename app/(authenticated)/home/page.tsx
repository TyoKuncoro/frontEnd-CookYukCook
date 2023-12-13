"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button, Calendar, Card, Modal } from "antd";
import FullRoundedButton from "../../Component/fullRoundedButton";
import { store } from "#/store";
import { sampleRepository } from "#/repository/sample";
import {
  DownloadOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const onPanelChange = (value: any, mode: any) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};
const onPanelChange1 = (value: any, mode: any) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};


const Page = () => {


  // const { data, error, isLoading } = sampleRepository.hooks.useJoke();
  const [tema, setTema] = useState("Judul Tema");
  const [namaKelas, setNamaKelas] = useState("Nama Kelas");
  const [alamat, setAlamat] = useState("Alamat");
  const [startDate, setStartDate] = useState("tanggal mulai");
  const [endDate, setEndDate] = useState("tanggal selesai");
  const [price, setPrice] = useState(100000);
  const [terisi, setTerisi] = useState(4);
  const [availableBench, setAvailableBench] = useState(10);
  const [namaChef, setNamaChef] = useState("nama chef");
  const [materi, setMateri] = useState([1, 2, 3, 4, 5]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);


  const router = useRouter();

  const showModal = () => {
    if(!localStorage.getItem("access_token")){
      alert("silahkan login")
      router.push('login')
    } else{
    setIsModalOpen(true);
    }
  };
  const showModal1 = () => {
    if(!localStorage.getItem("access_token")){
      alert("silahkan login")
      router.push('login')
    } else{
    setIsModalOpen1(true);
    }
  };
  const showModal2 = () => {
    if(!localStorage.getItem("access_token")){
      alert("silahkan login")
      router.push('login')
    } else{
    setIsModalOpen2(true);
    }
  };

  const handleDaftar = () => {
    alert(
      "lanjut ke proses daftar di wiring ya mr. Tyo dancok yang gantreng  "
    );
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  console.log(localStorage.getItem("access_token"));
  const onFinish = () => {
    console.log("submit button pressed");
  };

  return (
    <div className="p-20 bg-white">
      <div className=" bg-orange-100 rounded-3xl">
        <div
          className="px-8 py-4 bg-orange-400 rounded-tl-3xl rounded-br-3xl"
          style={{
            marginRight: 1350,
          }}
        >
          Pilihan Untukmu
        </div>
        <div className=" py-4 mx-10">
          <Card
            title={namaKelas}
            extra={
              <FullRoundedButton text="Lihat Detail" onclick={showModal} />
            }
            style={{ width: 300 }}
          >
            <div className="flex justify-between">
              <div>
                <div>Tema: {tema}</div>
                <div>Kelas Regular</div>
                <div>lokasi:</div>
                <p className=" text-xs">{alamat}</p>
                <div className=" text-xs">Dimulai pada:</div>
                <div className="text-xs">
                  {startDate}-{endDate}
                </div>
                <div className=" font-bold text-lg mt-3">Cuma: {price}</div>
                <div className=" font-bold">
                  Quota: {terisi}/{availableBench}
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
        </div>
      </div>
      <div className="flex justify-between">
      <div className=" mt-6 bg-orange-100 rounded-3xl mr-10 w-[50%]">
          <div
            className="px-8 py-4 bg-orange-400 rounded-tl-3xl rounded-br-3xl "
            style={{
              marginRight: 320,
            }}
          >
            Kelas Regular Pilihanmu
          </div>
          <div className=" py-4 mx-10">
            <Card
              title={namaKelas}
              extra={
                <FullRoundedButton text="Lihat Detail" onclick={showModal1} />
              }
              style={{ width: 300 }}
            >
              <div className="flex justify-between">
                <div>
                  <div>Tema: {tema}</div>
                  <div>Kelas Regular</div>
                  <div>lokasi:</div>
                  <p className=" text-xs">{alamat}</p>
                  <div className=" text-xs">Dimulai pada:</div>
                  <div className="text-xs">
                    {startDate}-{endDate}
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
          </div>
        </div>
        <div className=" mt-6 bg-orange-100 rounded-3xl mr-10 w-[50%]">
          <div
            className="px-8 py-4 bg-orange-400 rounded-tl-3xl rounded-br-3xl "
            style={{
              marginRight: 320,
            }}
          >
            Kelas Private Pilihanmu
          </div>
          <div className=" py-4 mx-10">
            <Card
              title={namaKelas}
              extra={
                <FullRoundedButton text="Lihat Detail" onclick={showModal2} />
              }
              style={{ width: 300 }}
            >
              <div className="flex justify-between">
                <div>
                  <div>Tema: {tema}</div>
                  <div>Kelas Private</div>
                  <div>lokasi:</div>
                  <p className=" text-xs">{alamat}</p>
                  <div className=" text-xs">Dimulai pada:</div>
                  <div className="text-xs">
                    {startDate}-{endDate}
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
          </div>
        </div>
      </div>

      <Modal
        title="Daftar Kelas Regular"
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex justify-between">
          <div>
            <Image
              className=" rounded"
              src="/assets/Image.png"
              width={150}
              height={100}
              alt="Gambar"
            />
            <div className="font-bold">{tema}</div>
            <div className=" text-xs">Chef: {namaChef}</div>
          </div>
          <div>
            <div className=" bg-orange-50 rounded-lg p-2">
              <div>Materi Kelas yang dipelajari:</div>
              {materi.map((items) => (
                <div>{items}</div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <div className=" font-bold text-lg items-center">Rp. {price}</div>
              <div>
                <FullRoundedButton
                  text={"Daftar"}
                  icons={null}
                  onclick={handleDaftar}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Daftar Kelas Regular"
        open={isModalOpen1}
        // onOk={handleOk}
        onCancel={handleCancel1}
        footer={null}
      >
        <div className="flex justify-between">
          <div>
            <Image
              className=" rounded"
              src="/assets/Image.png"
              width={150}
              height={100}
              alt="Gambar"
            />
            <div className="font-bold">{tema}</div>
            <div className=" text-xs">Chef: {namaChef}</div>
          </div>
          <div>
            <div className=" bg-orange-50 rounded-lg p-2">
              <div>Materi Kelas yang dipelajari:</div>
              {materi.map((items) => (
                <div>{items}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{
              marginTop: 30,
              width: 450,
              border: `1px solid orange`,
              borderRadius: 10,
        }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
      </Modal>
      <Modal
        title="Daftar Kelas Regular"
        open={isModalOpen2}
        // onOk={handleOk}
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="flex justify-between">
          <div>
            <Image
              className=" rounded"
              src="/assets/Image.png"
              width={150}
              height={100}
              alt="Gambar"
            />
            <div className="font-bold">{tema}</div>
            <div className=" text-xs">Chef: {namaChef}</div>
          </div>
          <div>
            <div className=" bg-orange-50 rounded-lg p-2">
              <div>Materi Kelas yang dipelajari:</div>
              {materi.map((items) => (
                <div>{items}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{
              marginTop: 30,
              width: 450,
              border: `1px solid orange`,
              borderRadius: 10,
        }}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange1} />
        </div>
      </Modal>
    </div>
  );
};

export default Page;
