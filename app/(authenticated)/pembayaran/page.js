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
  
  // const benches = localStorage.getItem("benches") - 1


  const idKelasGet = localStorage.getItem("id")
  console.log(idKelasGet, 'ini id kelas')

   useEffect(() => {
    const priceGet = localStorage.getItem("priceTrainee");
    setPrice(priceGet);
    const courseGet = localStorage.getItem("courseTrainee");
    setCourse(courseGet);
    
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

  const {data: getKelas} = regularClassRepository.hooks.findRegClassById(idKelasGet)
  // console.log(getKelas?.data?.id, 'ini data kelas')
  const minusedOneBenches = parseInt(getKelas?.data?.numberOfBenches) - 1;
  // console.log(minusedOneBenches, 'ini data benches dikurangi satu')


  const handleCheckout = async () => {
      const uuidGenerator1 = uuidv4();
      console.log(uuidGenerator1, "ini uuid cook");
      const data = {
        id: uuidGenerator1,
        productName: course,
        price: price,
        quantity: 1,
      };
      const response = await fetch("api/token", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const requestData = await response.json();
      const dataBenches = {
        numberOfBenches: minusedOneBenches
      }
      // console.log(dataBenches, 'ini data benches')
      // console.log(getKelas?.data?.id, 'ini id kelas')
      try {
      const updateBenches = await regularClassRepository.manipulateData.updateBenches(getKelas?.data?.id, dataBenches)
      // console.log(updateBenches, 'ini data update benches')
      // console.log(requestData, "dataaa coook")
      localStorage.removeItem("id")
      localStorage.removeItem("priceTrainee");
      localStorage.removeItem("courseTrainee");
      window.snap.pay(requestData.token);
        
      } catch (e) {
        console.log(e, 'ini error')
      }
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
  let nama = "";
  if (!token) {
    setTimeout(message.error("Anda belum login, silahkan login"), 2000);
    router.push("login");
  }

  let role = "";
  if (token) {
    role = parseJwt(token).role;
    nama = parseJwt(token).name;

    // console.log(role, 'ini role');
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
            <div className="mb-2">Tema: {course}</div>
            {/* <div className="mb-5">Tema: {temaKelas}</div> */}
            <div>Harga: Rp. {price}</div>
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
