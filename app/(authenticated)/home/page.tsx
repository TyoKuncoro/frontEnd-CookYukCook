"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Calendar, Card, Modal, message } from "antd";
import FullRoundedButton from "../../Component/fullRoundedButton";
import { store } from "#/store";
import { sampleRepository } from "#/repository/sample";
import { useRouter } from "next/navigation";
import HomeKitchen from "../home-kitchen/page";
import { parseJwt } from "#/app/Component/Helper/convert";
import { regularClassRepository } from "#/repository/regularClass";
import { kitchenRepository } from "#/repository/kitchen";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';


function onPanelChange(value: any, mode: any) {
  console.log(value.format("YYYY-MM-DD"), mode);
}
function onPanelChange1(value: any, mode: any) {
  console.log(value.format("YYYY-MM-DD"), mode);
}

const Home: React.FC = () => {
  //======================================================================trainee
  const [tema, setTema] = useState("Judul Tema");
  const [namaKelas, setNamaKelas] = useState("Nama Kelas");
  const [alamat, setAlamat] = useState("Alamat");
  const [startDate, setStartDate] = useState("tanggal mulai");
  const [endDate, setEndDate] = useState("tanggal selesai");
  // const [price, setPrice] = useState(120000);
  const [terisi, setTerisi] = useState(4);
  const [availableBench, setAvailableBench] = useState(10);
  const [namaChef, setNamaChef] = useState("nama chef");
  const [materi, setMateri] = useState([1, 2, 3, 4, 5]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null)

  const router = useRouter();

  const showModal = (data: any) => {
    if (!localStorage.getItem("access_token")) {
      message.error("silahkan login");
      router.push("login");
    } else {
      setIsModalOpen(true);
      setSelectedData(data)
      console.log(data, "data");
    }
  };
  const showModal1 = () => {
    if (!localStorage.getItem("access_token")) {
      message.error("silahkan login");
      router.push("login");
    } else {
      setIsModalOpen1(true);
    }
  };
  const showModal2 = () => {
    if (!localStorage.getItem("access_token")) {
      message.error("silahkan login");
      router.push("login");
    } else {
      setIsModalOpen2(true);
    }
  };

  const handleDaftar = () => {
  //   message.error("wiring is in process");
    console.log(selectedData, "selected data")
    let actualPrice:any = selectedData?.price - selectedData?.adminFee
    localStorage.setItem('priceTrainee', actualPrice)
    localStorage.setItem('courseTrainee', selectedData?.courseName)
    localStorage.setItem('id', selectedData?.id)
    // localStorage.setItem('benches', selectedData?.numberOfBenches)
    router.push('/pembayaran')

    // setIsModalOpen(false);

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

  const onFinish = () => {
    console.log("submit button pressed");
  };

  const token = localStorage.getItem("access_token");
  let role: string = "";
  let id: string = "";
  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
    console.log(role, 'ini role');
    console.log(id, 'ini id');
  }
  const { data: dataKelas } =
    regularClassRepository.hooks.findAllRegularClass();
  console.log(dataKelas, "Data Kelas");
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
  // const formattedPrice = formatter.format(price);
  // const { data } = regularClassRepository.hooks.findRegClassByKitchen(dataUser?.data.id);
  // console.log(data, "ini data")
  return role === "Kitchen Studio" ? (
    <HomeKitchen />
  ) : (
    <div className="p-5 bg-white">
      <div className="  rounded-3xl" style={{ border: "2px solid #FF7D04" }}>
        <div
          className="px-8 py-4 bg-orange-400 rounded-tl-2xl rounded-br-3xl font-bold"
          style={{
            marginRight: "75%",
          }}
        >
          Pilihan Untukmu
        </div>
        <div className=" py-4 mx-10 h-80">
        <Swiper
              navigation={true}
              slidesPerView={4}
              modules={[Navigation]}
              className=" py-4 mx-10 flex justify-stretch gap-x-10"
            >

          {dataKelas?.data.map((item: any, index:any) =>(
                  <SwiperSlide key={index}>
            
            <Card
              title={item.courseName}
              className="mr-2 w-80"
              extra={
                <FullRoundedButton
                  text="Lihat Detail"
                  icons={null}
                  type={"primary"}
                  onclick={() => item.numberOfBenches == 0 ? message.error('Kuota sudah Penuh') : showModal(item)}
                />
              }
              style={{ width: 300 }}
            >
              <div className="flex justify-between">
                <div>
                  <div>Tema: {item.theme.name}</div>
                  <div>Kelas Regular</div>
                  {/* <div>lokasi:</div>
                  <p className=" text-xs">{alamat}</p> */}
                  <div className=" text-xs">Dimulai pada:</div>
                  <div className="text-xs">
                    {item.startDate.substring(0, 10)} sampai {item.endDate.substring(0, 10)}
                  </div>
                  <div className=" font-bold text-lg mt-3">Harga: {formatter.format(item.price - item.adminFee)}</div>
                  <div className=" font-bold">
                    Kuota: {item.numberOfBenches == 0 ? (<span className="text-red-500">Penuh</span>) : (`${item.numberOfBenches} Orang`) }
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
            </SwiperSlide>
          ))}
          </Swiper>
        </div>
      </div>
        <div className="flex justify-between">
          <div
            className=" mt-6 rounded-3xl mr-10 w-[50%]"
            style={{ border: "2px solid #FF7D04" }}
          >
            <div
              className="px-8 py-4 bg-orange-400 rounded-tl-2xl rounded-br-3xl  font-bold"
              style={{
                marginRight: 320,
              }}
            >
              Kelas Regular Pilihanmu
            </div>
            <div className=" py-4 mx-10 h-64">
            {token && (
              <Card
                title={namaKelas}
                extra={
                  <FullRoundedButton
                    text="Lihat Detail"
                    icons={null}
                    type={"primary"}
                    onclick={showModal1}
                  />
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
            )}
            </div>
          </div>
          <div
            className=" mt-6 rounded-3xl w-[50%]"
            style={{ border: "2px solid #FF7D04" }}
          >
            <div
              className="px-8 py-4 bg-orange-400 rounded-tl-2xl rounded-br-3xl font-bold"
              style={{
                marginRight: 320,
              }}
            >
              Kelas Private Pilihanmu
            </div>
            <div className=" py-4 mx-10">
              {/* {token && (
              <Card
                title={namaKelas}
                extra={
                  <FullRoundedButton
                    text="Lihat Detail"
                    icons={null}
                    type={"primary"}
                    onclick={showModal2}
                  />
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
              )} */}
            </div>
          </div>
        </div>
      <Modal
        title={selectedData?.courseName}
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
            <div className="font-bold">Daftar Kelas Regular</div>
            <div className=" text-xs">Quota : {selectedData?.numberOfBenches} orang</div>
            <div className=" text-xs">Dimulai pada:</div>
            <div className=" text-xs">{selectedData?.startDate.substring(0, 10)} sampai {selectedData?.endDate.substring(0, 10)}</div>
          </div>
          <div>
            <div className=" bg-orange-50 rounded-lg p-2">
              <div>Materi Kelas yang dipelajari:</div>
              {materi.map((items, index) => (
                <div key={index}>{items}</div>
              ))}
            </div>
            <div className="flex justify-between gap-4 mt-2">
              <div className=" font-bold text-lg items-center"> {formatter.format(selectedData?.price - selectedData?.adminFee)}</div>
              <div>
                <FullRoundedButton
                  text={"Daftar"}
                  icons={null}
                  type={"primary"}
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
              {materi.map((items, index) => (
                <li key={index}>{items}</li>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            width: 450,
            border: `1px solid orange`,
            borderRadius: 10,
          }}
        >
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
                <li>{items}</li>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 30,
            width: 450,
            border: `1px solid orange`,
            borderRadius: 10,
          }}
        >
          <Calendar fullscreen={false} onPanelChange={onPanelChange1} />
        </div>
      </Modal>
    </div>
  ) 
  
};

export default Home;
