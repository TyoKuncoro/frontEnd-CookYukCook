"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import Image from "next/image";
import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import LogoutButton from "#/app/Component/button";
import { useRouter } from "next/navigation";



const Profile = () => {
  const [email, setEmail] = useState("trainee@gmail.com");
  const router = useRouter();
  const token = localStorage.getItem("access_token")


  if(!token){
    alert('silahkan login')
    router.push('login')
  }

const handleLogOut = () =>{
    localStorage.removeItem("access_token")
    router.push('login')
}

  return (
    <div className="flex w-[100%]">
      <div className="w-[65%] ml-20">
        <div className="flex bg-orange-200 rounded-3xl mt-20">
          <div className=" ml-14 mt-14">
            <Image
              className=" rounded"
              src="/assets/account.png"
              width={150}
              height={150}
              alt="Gambar Pengguna"
            />
          </div>
          <div className=" ps-8 mt-14">
            <div className=" text-3xl font-bold mb-10">Nama Trainee</div>
            <table>
              <tbody className="flex flex-col gap-4 text-xl">
                <tr>
                  <td className=" w-48">Email</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">No. Whatsapp</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">Gender</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">Tanggal Lahir</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">Password</td>
                  <td>:</td>
                  <td className=" pl-20">
                    <FullRoundedButton
                      text="Ubah Password"
                      icons={<EditOutlined />}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="my-28">
              <FullRoundedButton text="Ubah Profile" icons={<EditOutlined />} />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-20 mt-10">
        <LogoutButton  text="Keluar" icons={<LogoutOutlined />} onclick={handleLogOut}/> 
      </div>
    </div>
  );
};

export default Profile;
