"use client";

import React from "react";
import Image from "next/image";
import LogoutButton from "#/app/Component/button";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const ProfileAdmin = () => {
  const router = useRouter();
  const data = {
    Nama: "Nama Admin",
    Email: "tyo@Admin.com",
    Password: "*********",
  };
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    router.push("login");
  };

  return (
      <div className="bg-orange-200 flex rounded-xl w-[70%] m-36">
        <div className=" ml-28 mt-14">
          <Image
            className=" rounded"
            src="/assets/account.png"
            width={150}
            height={150}
            alt="Gambar Pengguna"
          />
        </div>
        <div className="my-28 ps-8 ">
          <div className="text-3xl font-extrabold mb-6">{data.Nama}</div>
          <div>
            <table>
              <tbody className="flex flex-col gap-4">
                <tr>
                  <td className="w-48">Email</td>
                  <td>:</td>
                  <td className="pl-8">{data.Email}</td>
                </tr>
                <tr>
                  <td className="w-48">Password</td>
                  <td>:</td>
                  <td className="pl-8">{data.Password}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      {/* <div className="fixed top-8 right-36">
        <LogoutButton
          text="Keluar"
          icons={<LogoutOutlined />}
          onclick={handleLogOut}
        />
      </div> */}
    </div>
  );
};

export default ProfileAdmin;
