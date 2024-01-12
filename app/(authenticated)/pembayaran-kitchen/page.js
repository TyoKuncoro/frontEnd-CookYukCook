"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { useEffect, useState } from "react";
import Mistrans from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import axios from "axios";
import { usersPaymentRepository } from "#/repository/usersPayment";

// import snap from "midtrans-client"

const PembayaranKitchen = () => {
  const router = useRouter();

  //dummy data
  // const [temaKelas, setTemaKelas] = useState("Pembuatan Kue Kering");
  // end dummy data

  // from midtrans
  let snap = new Mistrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
  });

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const dataKelas = localStorage.getItem("idKelas");
  console.log(dataKelas, "ini data kelas");
  const { data: dataBayar } =
    regularClassRepository.hooks.findRegClassById(dataKelas);
  console.log(dataBayar?.data?.id, "ini data bayar");

  const handleCheckout = async () => {
    const uuidGenerator = uuidv4();
    // console.log(uuidGenerator, "ini uuid cook");

    const data = {
      id: uuidGenerator,
      productName: dataBayar?.data?.courseName,
      price: dataBayar?.data?.adminFee,
      quantity: 1,
    };
    console.log(dataBayar?.data.id, "ini data id")
    const approving = await regularClassRepository.manipulateData.updateApprove(dataBayar?.data?.id)
    console.log(approving, "ini approving")
    const response = await fetch("api/token", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const requestData = await response.json();
    // console.log(requestData, "dataaa coook")
    localStorage.removeItem("idKelas")
    window.snap.pay(requestData.token);
    // console.log("test")
  };
  //end for midtrans

  // Handle webHooks Midtrans
  // End handle webHooks Midtrans

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const todayDate = `${day} - ${month} - ${year}`;
  const token = localStorage.getItem("access_token");
  let role = "";
  let id = "";
  let nama = "";
  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
    nama = parseJwt(token).name;
    console.log(role, "ini role");
    console.log(id, "ini id");
  }
  if (!token) {
    setTimeout(message.error("Anda belum login, silahkan login"), 2000);
    router.push("login");
  }

  return (
    <div className="mt-20">
      <div className=" mx-80 py-16 flex place-content-center rounded-2xl">
        <div className=" w-[75%]">
          <div className="text-2xl font-bold text-orange-500">
            Pengajuan kelas Regular
          </div>
          <div className="text-xl mb-20">Nama: {nama}</div>
          <div className="text-xl font-bold text-orange-500 mb-5">
            Detail Pesanan
          </div>
          <div className="text-l font-bold bg-orange-200 px-10 w-[75%] py-5 rounded-lg">
            {/* <div className="mb-2">{namaKelas}</div> */}
            {/* <div className="mb-5">Tema: {courseName}</div> */}
            <tbody className="w-80">
              <tr>
                <td>Nama Kelas</td>
                <td>: {dataBayar?.data?.courseName}</td>
              </tr>
              <tr>
                <td className="w-56">Biaya Pengajuan Kelas (10%)</td>
                <td>: Rp. {dataBayar?.data?.adminFee}</td>
              </tr>
            </tbody>
          </div>
        </div>
        <div>
          <div className="text-right text-l flex flex-col text-xl font-bold justify-between screen mb-80">
            {todayDate}
          </div>
          <FullRoundedButton
            text={"Ajukan dan Bayar"}
            icons={null}
            onclick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default PembayaranKitchen;
