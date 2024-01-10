"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { useEffect, useState } from "react";
import Mistrans from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { message } from "antd";
import PembayaranKitchen from "../pembayaran-kitchen/page";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { usersPaymentRepository } from "#/repository/usersPayment";

// import snap from "midtrans-client"

const Pembayaran = () => {
  const router = useRouter();

  //dummy data
  const [namaKelas, setNamaKelas] = useState("Membuat Kue Khas Lebaran");
  const [temaKelas, setTemaKelas] = useState("Pembuatan Kue Kering");
  const [harga, setHarga] = useState(120000);
  const [tipeKelas, setTipeKelas] = useState("Regular");
  // end dummy data

  // from midtrans
  let snap = new Mistrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
  });
  const [price, setPrice] = useState(0);
  const [course, setCourse] = useState("-");

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
  const token = localStorage.getItem("access_token");

  const idKelas = localStorage.getItem("idKelas");
  const { data: dataKelas } =
    regularClassRepository.hooks.findRegClassById(idKelas);
    // console.log(dataKelas, 'ini data kelas')

  // const minusedOneBenches = parseInt(getKelas?.data?.numberOfBenches) - 1;

  let role = "";
  let id = "";
  let nama = "";

  if (token) {
    role = parseJwt(token).role;
    nama = parseJwt(token).name;
    id = parseJwt(token).id;
    // console.log(role, 'ini role');
  }
  const { data: isUserPay } = usersPaymentRepository.hooks.getUserPayByRegClass(dataKelas?.data?.id)
  console.log(isUserPay, "ini userPay")



  const handleCheckout = async () => {
    const uuidGenerator1 = uuidv4();
    console.log(uuidGenerator1, "ini uuid cook");
    const data = {
      id: uuidGenerator1,
      productName: dataKelas?.data?.courseName,
      price: dataKelas?.data?.price - dataKelas?.data?.adminFee,
      quantity: 1,
    };
    const response = await fetch("api/token", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const requestData = await response.json();
    // const dataBenches = {
    //   numberOfBenches: minusedOneBenches
    // }
    const dataPay = {
      status: "approve"
    }
  

    try {      
      // const updateBenches = await regularClassRepository.manipulateData.updateBenches(getKelas?.data?.id, dataBenches)
      // console.log(updateBenches, 'ini hasil post update benches')

      const approving = await usersPaymentRepository.manipulatedData.updateStatus(isUserPay.data)
      console.log(approving, "ini data approving")
      localStorage.removeItem("idKelas");
      // window.snap.pay(requestData.token);
    } catch (e) {
      console.log(e, "ini error approving");
    }
  };
  //end for midtrans

  // Handle webHooks Midtrans
  // End handle webHooks Midtrans

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const todayDate = `${day} - ${month} - ${year}`;

  const date = `${year}-${month}-${day}`;

  if (!token) {
    setTimeout(message.error("Anda belum login, silahkan login"), 2000);
    router.push("login");
  }

  return role === "Trainee" ? (
    <div className="mt-20">
      <div
        className=" mx-80 py-16 flex place-content-center rounded-2xl"
        // style={{border: "2px solid #FF7D04"}}
      >
        <div className=" w-[75%]">
          <div className="text-2xl font-bold text-orange-500">
            Pendaftaran Kelas {tipeKelas}
          </div>
          <div className="text-xl mb-20">Nama: {nama}</div>
          <div className="text-xl font-bold text-orange-500 mb-5">
            Detail Pesanan
          </div>
          <div className="text-l font-bold bg-orange-200 px-10 w-[50%] py-5 rounded-lg">
            <div className="mb-2">Tema: {dataKelas?.data?.courseName}</div>
            {/* <div className="mb-5">Tema: {temaKelas}</div> */}
            <div>
              Harga: Rp. {dataKelas?.data?.price - dataKelas?.data?.adminFee}
            </div>
          </div>
        </div>
        <div>
          <div className="text-right text-l flex flex-col text-xl font-bold justify-between screen mb-80">
            {todayDate}
          </div>
          <FullRoundedButton
            text={"Daftar dan Bayar"}
            icons={null}
            onclick={handleCheckout}
          />
        </div>
      </div>
    </div>
  ) : (
    <PembayaranKitchen />
  );
};

export default Pembayaran;
