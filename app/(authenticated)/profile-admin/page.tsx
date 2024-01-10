"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usersRepository } from "#/repository/user";
import { Image, Tag, message } from "antd";
import { parseJwt } from "#/app/Component/Helper/convert";

const ProfileAdmin = () => {
  const router = useRouter();
  const token = localStorage.getItem("access_token");
  if (!token) {
    setTimeout(message.error("Anda belum login, silahkan login"), 2000);
    router.push("login");
  }
  let role: string = "";
  let name: string = "";
  let id: string = "";
  console.log(token, "token");
  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
    // console.log(role, "role coookecoke");
  }
  const { data: dataAdmin } = usersRepository.hooks.getUsersById(id);
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    router.push("login");
  };

  return (
    <div className="m-auto flex justify-center items-center h-full w-[100%]">
      <div className="flex gap-14 px-8 py-7 bg-white border border-solid border-slate-100 shadow-xl rounded-sm">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="rounded-md"
            src={"/assets/account.png"}
            width={250}
            height={250}
            alt="Gambar Pengguna"
          />
          <p className="text-2xl font-medium mt-4">Admin</p>
        </div>
        <div className="text-justify bg-white py-7 px-10 rounded">
          <div className="flex mb-4">
            <p className="text-4xl font-bold">{dataAdmin?.data?.name}</p>
            <Tag color="green" className="mt-2  ml-10 text-xl h-8">
              {dataAdmin?.data?.status}
            </Tag>
          </div>
          <div className="flex text-xl mb-3">
            <p className=" font-semibold mr-32">Email</p>
            <p className="mr-2"></p>
            <p>{dataAdmin?.data?.email}</p>
          </div>
          <div className="flex text-xl">
            <p className=" font-semibold mr-20">Kata Sandi</p>
            <p className="mr-2"></p>
            <p className="text-xl">********</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;
