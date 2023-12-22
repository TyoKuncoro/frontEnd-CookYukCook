"use client"

import { temaKelasRepository } from "#/repository/tema";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useState } from "react";
import ModalPengajuan from "./createPengajuan";
import FormPengajuanKelas from "./formPengajuan";
import FormTambahTema from "./formTambahTema";
import ModalTambahTema from "./material/modalTambahTema";
import TambahTema from "./material/modalTambahTema";
import UbahMateriBtn from "./buttonUbahMateri";


export default function TemaKelas (){
    const[modalOpen, setModalOpen] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [tema, setTema] =useState([]);
    const [openModal, setOpenModal] = useState(false)
    const {data} = temaKelasRepository.hooks.findAllTema();
    console.log(data)
    useEffect(() => {
        setTema(data?.data)
    })
    const handleClick = (record:any) => {
        setSelectedTheme(record)
        setModalOpen(true)
    }
    const handleClose = () =>{
        setModalOpen(false)
    }
    const handleOpenModal = () => {
      setOpenModal(true)
    }
    const handleCloseModal = () => {
      setOpenModal(false)
    }
    interface DataType {
        key: string;
        name: string;
        chef_name: string;
        price: number;
      }
      
      const columns: ColumnsType<DataType> = [
        {
          title: 'Nama Tema',
          dataIndex: 'name',
          key: 'name',
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'Nama Chef',
          dataIndex: 'chef_name',
          key: 'chef_name',
        },
        {
          title: 'Harga',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Pilih Tema',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() => handleClick(record)}>Ajukan Kelas {record.name}</a>
            </Space>
          ),
        },
      ];
    return (
        <div>
          <UbahMateriBtn key={null} text="Tambah Tema Kelas" onclick={handleOpenModal}/>
            <Table className="mt-5 text-xl" columns={columns} dataSource={tema} />
            <ModalPengajuan 
            title="pengajuan Kelas" 
            closeModal={handleClose} 
            visible={modalOpen}
            content={<FormPengajuanKelas/>}/>
            <TambahTema open={openModal} closeModal={handleCloseModal}/>
        </div>
    )
}