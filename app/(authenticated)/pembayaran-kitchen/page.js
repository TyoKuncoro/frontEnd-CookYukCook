"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { useEffect, useState } from "react";
import Mistrans from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { parseJwt } from "#/app/Component/Helper/convert";

// import snap from "midtrans-client"

const PembayaranKitchen = () => {
  const router = useRouter();

  //dummy data
  const [namaKelas, setNamaKelas] = useState("Membuat Kue Khas Lebaran");
  // const [temaKelas, setTemaKelas] = useState("Pembuatan Kue Kering");
  const [harga, setHarga] = useState(0);
  const [tipeKelas, setTipeKelas] = useState("Regular");
  const [courseName, setCourseName] = useState("-");
  // end dummy data

  // from midtrans
  let snap = new Mistrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
  });

  useEffect(() => {
    const courseGet = localStorage.getItem("courseName");
    setCourseName(courseGet);
    console.log(courseName, "courseName");
    const hargaGet = localStorage.getItem("price");
    setHarga(hargaGet);
    // console.log(harga, "harga")
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
  const handleCheckout = async () => {
      const uuidGenerator = uuidv4();
      // console.log(uuidGenerator, "ini uuid cook");

      const data = {
        id: uuidGenerator,
        productName: courseName,
        price: harga,
        quantity: 1,
      };
      const response = await fetch("api/token", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const requestData = await response.json();
      // console.log(requestData, "dataaa coook")
      localStorage.removeItem("courseName");
      localStorage.removeItem("price");
      window.snap.pay(requestData.token);
      // console.log("test")
  } 
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
            Pengajuan kelas {tipeKelas}
          </div>
          <div className="text-xl mb-20">Nama: {nama}</div>
          <div className="text-xl font-bold text-orange-500 mb-5">
            Detail Pesanan
          </div>
          <div className="text-l font-bold bg-orange-200 px-10 w-[75%] py-5 rounded-lg">
            {/* <div className="mb-2">{namaKelas}</div> */}
            {/* <div className="mb-5">Tema: {courseName}</div> */}
            <tbody>
              <tr>
                <td className="w-56">Tema</td>
                <td>: {courseName}</td>
              </tr>
              <tr>
                <td className="w-56">Biaya Pengajuan Kelas (10%)</td>
                <td>: Rp. {harga}</td>
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
