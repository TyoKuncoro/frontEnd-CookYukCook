"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import { useEffect, useState } from "react";
import Mistrans from "midtrans-client";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Empty, Space, Table, Tag, message } from "antd";
import PembayaranKitchen from "../pembayaran-kitchen/page";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { usersPaymentRepository } from "#/repository/usersPayment";

// import snap from "midtrans-client"

const Pembayaran = () => {
  const router = useRouter();

  //dummy data

  // from midtrans
  let snap = new Mistrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
  });
  const [price, setPrice] = useState(0);
  const [course, setCourse] = useState("-");

  // const benches = localStorage.getItem("benches") - 1

  const idKelasGet = localStorage.getItem("id");
  console.log(idKelasGet, "ini id kelas");

  useEffect(() => {
    const priceGet = localStorage.getItem("priceTrainee");
    setPrice(priceGet);
    const courseGet = localStorage.getItem("courseTrainee");
    setCourse(courseGet);
  })
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });

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

  const { data: getKelas } =
    regularClassRepository.hooks.findRegClassById(idKelasGet);
  // console.log(getKelas?.data?.id, 'ini data kelas')
  const minusedOneBenches = parseInt(getKelas?.data?.numberOfBenches) - 1;
  // console.log(minusedOneBenches, 'ini data benches dikurangi satu')
  let role = "";
  let id = "";
  let nama = "";

  if (token) {
    role = parseJwt(token).role;
    nama = parseJwt(token).name;
    id = parseJwt(token).id;
  }
  const idBayar = localStorage.getItem("idBayar")
  console.log(idBayar, "ini idBayar")
  const {data: dataBayar} = usersPaymentRepository.hooks.getUserPayById(idBayar)
  console.log(dataBayar, "ini dataBayar")

  const uuidGenerator1 = uuidv4();
  const data = {
    id: uuidGenerator1,
    productName: dataBayar?.data?.regular?.courseName,
    price: dataBayar?.data?.regular?.price - dataBayar?.data?.regular.adminFee,
    quantity: 1,
  };

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
      numberOfBenches: minusedOneBenches,
    };

    try {
    } catch (e) {}

    try {
      const updateBenches =
        await regularClassRepository.manipulateData.updateBenches(
          getKelas?.data?.id,
          dataBenches
        );
      console.log(updateBenches, "ini hasil post update benches");
      localStorage.removeItem("id");
      localStorage.removeItem("priceTrainee");
      localStorage.removeItem("courseTrainee");
      window.snap.pay(requestData.token);
    } catch (e) {
      console.log(e, "ini error update benches");

    try {      

      const approving = await usersPaymentRepository.manipulatedData.updateStatus(idBayar)
      console.log(approving, "ini data approving")
      localStorage.removeItem("idBayar");
      window.snap.pay(requestData.token);
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

  let role = "";
  if (token) {
    role = parseJwt(token).role;
    nama = parseJwt(token).name;

    // console.log(role, 'ini role');
  }
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const data =[
    {
      key: '1',
      date: '2024-01-04',
      regular: 'Memasak Masakan Khas Manado',
      price: 324560,
      status: ['pending']
    },
    {
      key: '2',
      date: '2024-01-04',
      regular: 'Memasak Masakan Khas Manado',
      price: 324560,
      status: ['pending']
    },
    {
      key: '3',
      date: '2024-01-04',
      regular: 'Memasak Masakan Khas Manado',
      price: 324560,
      status: ['pending']
    },
    {
      key: '4',
      date: '2024-01-04',
      regular: 'Memasak Masakan Khas Manado',
      price: 324560,
      status: ['pending']
    },
    {
      key: '5',
      date: '2024-01-04',
      regular: 'Memasak Masakan Khas Manado',
      price: 324560,
      status: ['pending']
    }
  ]
  const columns= [
    {
      title: "Tanggal",
      dataIndex: "date",
      key: "date",
      render: (date) => <p>{date.substring(0, 10)}</p>
      // render: (_, record) => (
      //   <Image
      //     width={80}
      //     height={80}
      //     src={`http://localhost:3222/kitchen-studio/upload-logo/${record.logos}/image`}
      //   />
      // ),
    },
    {
      title: "Nama Kelas",
      dataIndex: "regular",
      key: "name",
      render: (regular) => <p>{regular}</p>,
    },
    {
      title: "Harga",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>{formatter.format(price)}</p>,
    },
    {
      title: "Detail",
      dataIndex: "status",
      key: "status",
      render:(status) => <Tag color="orange" className="border border-solid border-orange-500 w-20 text-center text-base">{status}</Tag>
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space size="middle">
          <FullRoundedButton
            text={"Daftar dan Bayar"}
            icons={null}
            onclick={handleCheckout}
          />
        </Space>
      ),
    },
  ];
  return role === "Trainee" ? (
    // return role === "Trainee" ? (
    //   <div className="mt-20">
    //     <div
    //       className=" mx-80 py-16 flex place-content-center rounded-2xl"
    //       // style={{border: "2px solid #FF7D04"}}
    //     >
    //       <div className=" w-[75%]">
    //         <div className="text-2xl font-bold text-orange-500">
    //           Pendaftaran Kelas {!dataBayar?.data.regular ? "Private" : "Regular"}
    //         </div>
    //         <div className="text-xl mb-20">Nama: {nama}</div>
    //         <div className="text-xl font-bold text-orange-500 mb-5">
    //           Detail Pesanan
    //         </div>
    //         <div className="text-l font-bold bg-orange-200 px-10 w-[50%] py-5 rounded-lg">
    //           <div className="mb-2">Tema: {dataBayar?.data?.regular?.courseName}</div>
    //           {/* <div className="mb-5">Tema: {temaKelas}</div> */}
    //           <div>
    //             Harga: Rp. {dataBayar?.data?.regular?.price - dataBayar?.data?.regular?.adminFee}
    //           </div>
    //         </div>
    //       </div>
    //       <div>
    //         <div className="text-right text-l flex flex-col text-xl font-bold justify-between screen mb-80">
    //           {todayDate}
    //         </div>
    <div>
      <Table columns={columns} dataSource={data} pagination={false} scroll={{y:360}} className="mb-14"/>
      <hr/>
      {getKelas ? (
        <div>
          <div
            className=" mx-80 flex place-content-center rounded-2xl"
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
        <Empty
        className="mt-10"
          image={`/assets/payNotFound.png`}
          imageStyle={{width:300, height:300 , margin:"auto"}}
          description={<span className="opacity-70 font-medium text-lg">Belum ada transaksi</span>}
        />
      )}
    </div>
  ) : (
    <PembayaranKitchen />
  );
};
}
export default Pembayaran;
