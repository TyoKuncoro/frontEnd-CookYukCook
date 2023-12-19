"use client";
import React from "react";
import { Collapse, Card } from "antd/lib/index";
import { CollapseProps } from "antd/lib";
import ListKelasRegular from "#/app/Component/listKelasRegular";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ListTrainee from "#/app/Component/listTrainee";
import ModalPengajuan from "#/app/Component/createPengajuan";
import TambahMateri from "#/app/Component/material/modalTambahMateri";
import UbahMateri from "#/app/Component/material/modalUbahMateri";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
    extra: <UbahMateri/>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
    extra: <UbahMateri/>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    extra: <UbahMateri />,
  },
  {
    key: "4",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    extra: <UbahMateri/>,
  },
];
const ListRegular = () => {
  return (
    <div className="bg-white p-20 w-full space-y-16">
        <div className="float-right mr-3">
            <ModalPengajuan/>
        </div>
        <div className="flex justify-between">
          <div className=" space-y-0">
            <p className="text-4xl font-bold">Cooking Class</p>
            <p className="text-2xl">Tema: Membuat Kue Khas Lebaran</p>
            <p className="text-xl">Chef: Nazhwa Nur S</p>
          </div>
        </div>
  
        <div className="flex w-full gap-52">
          <div className="">
            <div className="flex justify-between">
              <p className="text-3xl font-bold">Materi Kelas</p>
              <TambahMateri/>
            </div>
            <div className="div-list w-[1020px] h-auto p-2 rounded-lg">
              <ListKelasRegular items={items} />
            </div>
          </div>
          <div>
            <ListTrainee />
          </div>
        </div>
        <hr />
        
    </div>

  );
}
export default ListRegular 