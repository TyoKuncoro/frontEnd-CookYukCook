import { Card } from "antd";
import Image from "next/image";
import FullRoundedButton from "./fullRoundedButton";

type props = {namaKelas: string, }
const cardTemplated = ({}) => {
  return (
    <div className=" py-4 mx-10">
      <Card
        title={namaKelas}
        extra={<FullRoundedButton text="Lihat Detail" onclick={showModal} />}
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
            <div className=" font-bold text-lg mt-3">Cuma: {price}</div>
            <div className=" font-bold">
              Quota: {terisi}/{availableBench}
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
    </div>
  );
};

export default cardTemplated