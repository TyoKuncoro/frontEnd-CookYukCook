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
    usersPaymentRepository.hooks.getUserPayById(dataKelas);
  console.log(dataBayar, "ini data bayar");

  const handleCheckout = async () => {
    const uuidGenerator = uuidv4();
    // console.log(uuidGenerator, "ini uuid cook");

    const data = {
      id: uuidGenerator,
      productName: dataBayar?.data?.regular?.courseName,
      price: dataBayar?.data?.regular?.adminFee,
      quantity: 1,
    };
    console.log(dataBayar?.data.id, "ini data id")
    const approving = await regularClassRepository.manipulateData.updateApprove(dataBayar?.data.regular.id)
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
  console.log(today, "today")
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.toLocaleDateString()
const time = today.toLocaleTimeString('en-US', { hour12: false })
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
    <div className="flex justify-center items-center m-auto h-full">
      <div className="bg-white w-[800px] p-5 shadow-md border border-solid border-slate-100 rounded-md">
        <div className="text-4xl font-bold text-center mb-10"> Pembayaran Pengajuan Kelas Regular</div>
        <div className="flex gap-2 justify-end mb-5">
          <div className="text-lg">{date}</div>
          <div className="text-lg">{time}</div>
        </div>
        <div className="w-[730px] m-auto">
          <div className="flex justify-between mb-4">
            <div className="text-xl font-semibold">Nama Studio Masak</div>
            <div className="text-xl">{nama}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-xl font-semibold">Nama Kelas</div>
            <div className="text-xl">{dataBayar?.data?.regular?.courseName}</div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="text-xl font-semibold">Tema Kelas</div>
            <div className="text-xl">{dataBayar?.data?.regular?.theme?.name}</div>
          </div>
        <div className="flex justify-between mb-3">
          <div className="text-xl font-semibold">Harga</div>
          <div className="text-xl font-bold">{dataBayar?.data?.regular?.adminFee}</div>
        </div>
        </div>
        <div className="flex justify-center my-10">
          <FullRoundedButton
                text={"Ajukan dan Bayar"}
                icons={null}
                onclick={handleCheckout}
              />
        </div>
      </div>

    </div>
    // <div className="mt-20">
    //   <div className=" mx-80 py-16 place-content-center rounded-2xl">
    //     <div className=" w-[75%]">
    //       <div className="text-3xl font-bold text-orange-500">
    //         Pengajuan kelas Regular
    //       </div>
    //       <div className="text-xl mb-20">Nama Studio Masak: {nama}</div>
    //       <div className="text-xl font-bold text-orange-500 mb-5">
    //         Detail Pesanan
    //       </div>
    //       <div className="text-l font-bold bg-orange-200 px-10 w-[75%] py-5 rounded-lg">
    //         {/* <div className="mb-2">{namaKelas}</div> */}
    //         {/* <div className="mb-5">Tema: {courseName}</div> */}
    //         <tbody className="w-80">
    //           <tr>
    //             <td>Nama Kelas</td>
    //             <td>: {dataBayar?.data?.regular?.courseName}</td>
    //           </tr>
    //           <tr>
    //             <td>Tema Kelas</td>
    //             <td>: {dataBayar?.data?.regular?.theme?.courseName}</td>
    //           </tr>
    //           <tr>
    //             <td className="w-56">Biaya Pengajuan Kelas (10%)</td>
    //             <td>: Rp. {dataBayar?.data?.regular?.adminFee}</td>
    //           </tr>
    //         </tbody>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="text-right text-base flex flex-col text-xl font-bold justify-between screen mb-80">
    //        Tanggal Transaksi: {todayDate}
    //       </div>
          // <FullRoundedButton
          //   text={"Ajukan dan Bayar"}
          //   icons={null}
          //   onclick={handleCheckout}
          // />
    //     </div>
    //   </div>
    // </div>
  );
};

export default PembayaranKitchen;
