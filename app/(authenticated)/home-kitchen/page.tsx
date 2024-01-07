"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  DatePicker,
  Card,
  Input,
  InputNumber,
  Modal,
  message,
  Form,
  Select,
  Button,
  Empty,
} from "antd";
import Image from "next/image";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { PrinterOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { format } from "date-fns";
import { kitchenRepository } from "#/repository/kitchen";
import { mutate } from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ModalCustom from "#/app/Component/createPengajuan";
import FormPengajuanKelas from "#/app/Component/formPengajuan";
import { useForm } from "antd/es/form/Form";
import { DatePickerProps } from "antd/lib";

const HomeKitchen: React.FC = () => {
  const router = useRouter();
  const [form] = useForm()
  const token = localStorage.getItem("access_token");
  console.log(token, "toooooooooooooken");
  let id: string = "";
  let email: string = "";
  if (token) {
    id = parseJwt(token).id;
    console.log(id, "id");
  }
  // const ajukanKelas = () => {};

  // console.log(dataUser, "data uuuuuuuuuuuuuuuuser");


  const { data: dataUser } = kitchenRepository.hooks.getKitchenByUser();
  console.log(dataUser, "data user");


  const [modalOpen, setModalOpen] = useState(false);
  // console.log(dataUser?.data?.users?.status, "ini status")
  const handleOK = () => {
    if(dataUser?.data?.users?.status === "pending"){
      message.error("Mohon tunggu konfirmasi akun dari admin")
    }else if(dataUser?.data?.users?.status === "active"){
      setModalOpen(true);
    }
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateSelect = (date: any) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
  };
  
  // const editKelas = (event: any) => {
  //   console.log(event.key);
  // };
  // // const ajukanKelas = () => {};

  // const [modalAjukan, setModalAjukan] = useState(false);
  // console.log(dataUser?.data?.users?.status, 'iniStatus')
  // const modalAjukanKelas = () => {
  //   if (!token) {
  //     message.error("silahkan login");
  //     router.push("/login");
  //   } else {
  //     if(dataUser?.data?.users?.status === "pending"){
  //       message.error('Mohon tunggu verifikasi akun dari admin')
  //     }else if(dataUser?.data?.users?.status === "active"){
  //       setModalVisible(true);
  //     }
  //   }
  // };
  // // console.log(dataUser, "data uuuuuuuuuuuuuuuuser");

  // const [modalVisible, setModalVisible] = useState(false);
  // const [courseName, setCourseName] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [theme, settheme] = useState("");
  // const [price, setPrice] = useState(0);
  // const [numberOfBenches, setNumberOfBenches] = useState(0);
  // const [description, setDescription] = useState("");
  // const [selectedDataKitchen, setSelectedDataKitchen] = useState<any>(null);

  // // console.log(dataUser, "data user");
  // const onFinish = async () => {
  //   console.log(`${id}, id
  //   ${courseName} = course
  //   ${startDate} = startDate
  //   ${endDate} = endDate
  //   ${price} = price
  //   ${theme} = theme
  //   ${numberOfBenches} = benches
  //   ${description} = description`)
  //   // console.log(startDate, "startDate");
  //   // console.log(endDate, "endDate");

  //   try {
  //     let data = {
  //       kitchen_id: dataUser?.data?.id,
  //       theme_id:theme ,
  //       courseName: courseName,
  //       startDate: startDate,
  //       endDate: endDate,
  //       price: price,
  //       numberOfBenches: numberOfBenches,
  //       description: description,
  //     };
  //     const mengajukanKelas =
  //       await regularClassRepository.manipulateData.createKelasReg(data);
  //     console.log(
  //       mengajukanKelas,
  //       "Meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeengajukan kelas"
  //     );
  //     // console.log(mengajukanKelas.body.data.adminFee, "price")
  //     // console.log(mengajukanKelas.body.data.courseName, "courseName")
  //     localStorage.setItem('price', mengajukanKelas.body.data.adminFee)
  //     localStorage.setItem('courseName', courseName)
  //     setCourseName("");
  //     setStartDate("");
  //     setEndDate("");
  //     setPrice(0);
  //     settheme("");
  //     setNumberOfBenches(0);
  //     setDescription("");
  //     router.push("/pembayaran");
  //     mutate(regularClassRepository.url.findRegClassByKitchen(id));
  //   } catch (e) {
  //     console.log(e, "eror mengajukan data");
  //   }
  //   localStorage.setItem('price', price/10)
  //   localStorage.setItem('courseName', courseName)
  //   router.push("/pembayaran");
  //   setModalVisible(false);
  // };

  // const handleCancel = () => {
  //   setModalVisible(false);
  // };
  // const handleOK = () => {
  //   setModalOpen(true);
  // };
  // const handleClose = () => {
  //   setModalOpen(false);
  // };
  const { data: dataRegular } = regularClassRepository.hooks.findRegClassByKitchen(id);
  console.log(dataRegular, "data kelas regular");
  // // const { data, mutate:mutateData } = regularClassRepository.hooks.findAllRegularClass();
  // // console.log(data?.data, "data kelas regular");

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  // const onChange1 = (value: number) => {
  //   console.log("changed", value);
  //   // form.setFieldValue('adminFee', value * 10 / 100)
  // };
  // const onChangeTema = (value :string[]) => {
  //   console.log(`selected ${value}`)

  // }
  // const handleAdminFee = (value: number) =>{
  //   form.setFieldValue('adminFee', value * 10 / 100)
  // }
  return (
    <div>
      <ModalCustom 
      width={843}
      title="Pengajuan Kelas"
      closeModal={handleClose}
      visible={modalOpen}
      content={<FormPengajuanKelas onClose={handleClose} mutateData={null}/>}/>
      <div className="text-2xl font-semibold mb-3">Jadwal</div>
      <div className="">
        <div className=" w-[50%]">
          <Calendar
            fullscreen={false}
            onSelect={handleDateSelect}
            className="bg-orange-300 w-96 shadow-md"
          />
        </div>
        <div
          className="  w-full mt-5 rounded-3xl border border-solid border-button shadow-md"
        >
          <div className="flex justify-between m-2">
            
             <p className="font-bold text-2xl">Kelas Anda</p>
            {/* <UbahMateriBtn text="Ajukan Kelas" key={null} onclick={handleOK} /> */}
            <FullRoundedButton
              text="Ajukan Kelas"
              icons={<SendOutlined />}
              onclick={handleOK}
            />
          </div>
          {!dataRegular ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description={
                  <span>Kelas Masih Kosong</span>
                }/>
            ) : (
            <div>
          <Swiper
            spaceBetween={10}
            navigation={true}
            slidesPerView={4}
            modules={[Navigation]}
            className=" py-2 flex gap-4 mb-4"
          >
            {token &&
              dataRegular?.data.map((item: any, index: any) => (
                <SwiperSlide key={index}>
                  <Card style={{ width: 300 }} className="rounded-lg p-2 ml-6 shadow-sm">
                    <div className=" content-between ">
                      <Image
                        className=" rounded"
                        src="/assets/Image.png"
                        width={220}
                        height={175}
                        alt="Gambar"
                      />
                      <div className="flex justify-between">
                        <div>
                          <div className="text-xl font-bold">
                            {item.courseName}
                          </div>
                          <div className=" font-bold">Dimulai pada:</div>
                          <div className="font-bold">
                            {item.startDate.substring(0, 10)} sampai{" "}
                            {item.endDate.substring(0, 10)}
                          </div>

                          <div className="mt-2">Chef: {item.theme.chef_name}</div>
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
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>
          </div>
          )}
        </div>
      </div>
      {/* <ModalCustom
        width={843}
        title="Pengajuan Kelas"
        closeModal={handleClose}
        visible={modalOpen}
        content={
          <FormPengajuanKelas onClose={handleClose} mutateData={mutateData} />
        }
      /> */}
      {/* <p>Selected Date: {selectedDate}</p> */}
      {/* <div className="flex mt-3">
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
      </div> */}
    </div>
  );
};

export default HomeKitchen;
