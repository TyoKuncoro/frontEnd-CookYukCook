"use client";

import React, { useState } from "react";
import { Calendar, DatePicker, Input, InputNumber, Modal, message } from "antd";
import Image from "next/image";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { PrinterOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { format } from "date-fns";
import { kitchenRepository } from "#/repository/kitchen";
import { mutate } from "swr";

const HomeKitchen: React.FC = () => {
  const router = useRouter();
  const [tema, setTema] = useState("Judul Tema");

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [variableKelas, setVariableKelas] = useState("");

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };
  const data1 = {
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

  const token = localStorage.getItem("access_token");
  console.log(token, "toooooooooooooken")
  const editKelas = (event: any) => {
    console.log(event.key);
  };

  let id: string = "";
  let email: string = "";
  if (token) {
    id = parseJwt(token).id;
    console.log(id, "id");
  }
  // const ajukanKelas = () => {};

  const [modalAjukan, setModalAjukan] = useState(false);
  const modalAjukanKelas = () => {
    if (!token) {
      message.error("silahkan login");
      router.push("/login");
    } else {
      setModalVisible(true);
    }
  };
  const { data: dataUser } = kitchenRepository.hooks.getKitchenByUser();
  // console.log(dataUser, "data uuuuuuuuuuuuuuuuser");

  const [modalVisible, setModalVisible] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState(0);
  const [numberOfBenches, setNumberOfBenches] = useState(0);
  const [description, setDescription] = useState("");

  const handleOk = async () => {
    // console.log(`${id}, id
    // ${courseName} = course
    // ${startDate} = startDate
    // ${endDate} = endDate
    // ${price} = price
    // ${numberOfBenches} = benches
    // ${description} = description`)
    console.log(startDate, "startDate");
    console.log(endDate, "endDate");
    try {
      let data = {
        kitchen_id: dataUser?.data?.id,
        // theme_id: ,
        courseName: courseName,
        startDate: startDate,
        endDate: endDate,
        price: price,
        numberOfBenches: numberOfBenches,
        description: description,
      };
      const mengajukanKelas =
        await regularClassRepository.manipulateData.createKelasReg(data);
      console.log(
        mengajukanKelas,
        "Meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeengajukan kelas"
      );
      setCourseName("");
      setStartDate("");
      setEndDate("");
      setPrice(0);
      setNumberOfBenches(0);
      setDescription("");

      mutate(regularClassRepository.url.findRegClassByKitchen(id));
    } catch (e) {
      console.log(e, "eror mengajukan data");
    }
    // router.push("/pembayaran");
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const { data } = regularClassRepository.hooks.findRegClassByKitchen(id);
  console.log(data?.data, "data kelas regular");

  const changeTanggalMulai = (date: any, dateString: any) => {
    setStartDate(dateString);
  };
  const changeTanggalSelesai = (date: any, dateString: any) => {
    setEndDate(dateString);
  };

  return (
    <div>
      <Modal
        title="Pengajuan Kelas Regular"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Nama Course"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <DatePicker
          placeholder="Tanggal Mulai"
          format="YYYY-MM-DD"
          onChange={changeTanggalMulai}
          style={{ marginBottom: "1rem", display: "block" }}
        />
        <DatePicker
          placeholder="Tanggal Selesai"
          format="YYYY-MM-DD"
          onChange={changeTanggalSelesai}
          style={{ marginBottom: "1rem", display: "block" }}
        />
        Harga :
        <InputNumber
          placeholder="Harga"
          value={price}
          onChange={(value) => setPrice(value)}
          style={{ marginBottom: "1rem", display: "block" }}
        />
        Jumlah Benches :
        <InputNumber
          placeholder="Jumlah Bangku"
          value={numberOfBenches}
          onChange={(value) => setNumberOfBenches(value)}
          style={{ marginBottom: "1rem", display: "block" }}
        />
        <Input.TextArea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
      </Modal>
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
          <div className="flex justify-between">
            <div
              className="px-8 py-4 bg-orange-400 rounded-tl-3xl rounded-br-3xl"
              style={{
                marginRight: "50%",
              }}
            >
              Kelas Anda
            </div>
            <FullRoundedButton
              text="Ajukan Kelas"
              icons={<SendOutlined />}
              onclick={modalAjukanKelas}
            />
          </div>
          <div className=" py-4 mx-10 flex">
            {token &&
              data?.data.map((item: any, index: any) => (
                <div
                  style={{ width: 300 }}
                  className="bg-orange-300 rounded-lg p-6 mr-2"
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
                        <div className="text-xl font-bold">
                          Tema: {item.courseName}
                        </div>
                        <div className=" font-bold">Dimulai pada:</div>
                        <div className="font-bold">
                          {item.startDate.substring(0, 10)} sampai{" "}
                          {item.endDate.substring(0, 10)}
                        </div>

                        <div className="mt-2">Chef: {item.chef_name}</div>
                      </div>
                    </div>
                    {/* <div className="flex justify-between">
                      <FullRoundedButton
                        text="Lihat Detail"
                        icons={null}
                        type={"primary"}
                        //   onclick={showModal}
                      />
                    </div> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <p>Selected Date: {selectedDate}</p> */}
      <div className="flex mt-3">
        <div className="w-[50%] bg-orange-300 rounded mr-20">
          {token &&
            kelas.map((item, index) => (
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
                      <PrinterOutlined onClick={() => console.log("chat")} />{" "}
                      export
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <FullRoundedButton text="Lihat Kelas" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomeKitchen;
