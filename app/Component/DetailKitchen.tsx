import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import { Image, message } from "antd";

function DetailKitchen({idKitchen}:any) {
    console.log(idKitchen, "HAI")
    const {data: dataKitchen} = kitchenRepository.hooks.getKitchenById(idKitchen)
    console.log(dataKitchen?.data, "yap yap")
    // const approve = async(idUsers) => {
    //     try{
    //         await usersRepository.manipulatedData.approveKitchen(idUsers)
    //         message.success("Data Berhasil dihapus")
    //     }catch(e){
    //         message.error("Gagal Menyetujui Kitchen")
    //     }
    // }
  return (
    <div className="flex text-start">
      <div>
        <Image
          width={100}
          height={100}
          src={`http://localhost:3222/kitchen-studio/upload-logo/${dataKitchen?.data?.logos}/image`}
        />
        <p className="mt-6 text-lg">
          Legalitas:
          <Image
            width={100}
            height={100}
            src={`http://localhost:3222/kitchen-studio/upload-legalitas/${dataKitchen?.data?.legality}/image`}
          />
        </p>
      </div>
      <div className="ml-6">
        <p className="text-base">Nama:{dataKitchen?.data?.users?.name}</p>
        <p className="text-base">Email: {dataKitchen?.data?.users?.email}</p>
        <p className="text-base">Phone Number:{dataKitchen?.data?.users?.phoneNumber}</p>
        <p className="text-base">Address:{dataKitchen?.data?.users?.address}</p>
        <p className="text-base">Number of Chef: {dataKitchen?.data.numberOfChefs}</p>
        <p className="text-base">
            Deskripsi: {dataKitchen?.data?.description}
        </p>
      <div className="flex gap-6">
        <a href="">Menyetujui</a>
        <a href="">Menolak</a>
      </div>
      </div>
    </div>
  );
}
export default DetailKitchen;
