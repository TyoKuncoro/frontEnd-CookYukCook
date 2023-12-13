"use client"

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { useEffect, useState } from "react";
import Mistrans from "midtrans-client"
import { v4 as uuidv4 } from 'uuid';
// import snap from "midtrans-client"

const Pembayaran = () => {
  //dummy data
  const [nama, SetNama] = useState("Cecil");
  const [namaKelas, setNamaKelas] = useState("Membuat Kue Khas Lebaran");
  const [temaKelas, setTemaKelas] = useState("Pembuatan Kue Kering");
  const [harga, setHarga] = useState(120000);
  const [tipeKelas, setTipeKelas] = useState("Regular");
  // end dummy data


  // from midtrans
  let snap = new Mistrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
  })

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT

    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
        document.body.removeChild(script)
    }

  }, [])

  const handleCheckout = async () => {
    const uuidGenerator = uuidv4();
    console.log(uuidGenerator, "ini uuid cook")
    const data = {
      id: uuidGenerator,
      productName: "buku",
      price: 120000,
      quantity: 1
    }
    const response = await fetch("api/token", {
      method: "POST",
      body: JSON.stringify(data)
    })
    const requestData = await response.json() 
    // console.log(requestData, "dataaa coook")
    window.snap.pay(requestData.token)

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

  return (
    <div className="p-12 my-20 bg-orange-50 mx-72 justify-between flex place-content-center rounded-2xl">
      <div className="">
        <div className="text-2xl font-bold text-orange-500">
          Pendaftaran Kelas {tipeKelas}
        </div>
        <div className="text-xl mb-20">Nama: {nama}</div>
        <div className="text-xl font-bold text-orange-500 mb-5">
          Detail Pesanan
        </div>
        <div className="text-l font-bold bg-orange-300 px-10 py-5 rounded-lg">
          <div className="mb-2">{namaKelas}</div>
          <div className="mb-5">Tema: {temaKelas}</div>
          <div>Harga: Rp. {harga}</div>
        </div>
      </div>
      <div>
        <div className="text-right text-l flex flex-col text-xl font-bold text-orange-500 justify-between screen mb-80">
          {todayDate}
        </div>
        <FullRoundedButton text={"checkout"} icons={null}  onclick={handleCheckout} />
      </div>
    </div>
  );
};

export default Pembayaran;
