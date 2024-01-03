"use client";
import UbahMateriBtn from "#/app/Component/buttonUbahMateri";
import ModalCustom from "#/app/Component/createPengajuan";
import DetailKitchen from "#/app/Component/detailKitchen";
import RejectKitchen from "#/app/Component/rejectKitchen";
import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import { Image, Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

function HomeAdmin() {
    let status = "pending";
    const { data, mutate:mutateData } = kitchenRepository.hooks.getKitchenPending(status);
    const [showModal, setShowModal] = useState(false);
    const [detail, setDetail] = useState();
    console.log(data?.data, "ini data cuy");
    interface DataType {
        key: string;
        users: string;
        logos: string;
    }
    const handleOpen = (record) => {
        setShowModal(true)
        setDetail(record)
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Foto Legalitas',
            dataIndex: 'legality',
            key: 'legality',
            render: (_, record) => (
                <Image
                    width={150}
                    height={150}
                    // className="rounded-full shadow-sm"
                    src={`http://localhost:3222/kitchen-studio/upload-logo/${record.logos}/image`}
                />
            )
        },
        {
            title: 'Nama Studio Masak',
            dataIndex: 'users',
            key: 'users',
            render: (users) => <p>{users.name}</p>
        },
        {
            title: 'Alamat',
            dataIndex: 'users',
            key: 'address',
            render: (address) => <p>{address.address}</p>
        },
        {
            title: 'No WhatsApp',
            dataIndex: 'users',
            key: 'phoneNumber',
            render: (phoneNumber) => <p>{phoneNumber.phoneNumber}</p>
        },
        {
            title: 'Aksi',
            key: 'aksi',
            render: (_, record) => (
                <Space size="middle">
                    <UbahMateriBtn key={record.key} onclick={() => handleOpen(record)} text={"Lihat Detail"}/>
                    {/* <a key={record.users.id} onClick={()=>approve(record.users.id, record.users.name)}>Menyetujui</a>
                    <a key={record.users.id} onClick={() => handleOpen(record)}>Menolak</a> */}
                </Space>
            )
        }
    ]
    return (
        <div className="bg-white p-20 w-full space-y-16">
            <p className="text-2xl font-bold">Verifikasi Studio Masak</p>
            <Table columns={columns} dataSource={data?.data} />
            <ModalCustom
            width={700}
            title = {'Detail Studio Masak'}
            closeModal={handleClose}
            visible={showModal}
            content= {
                <DetailKitchen idKitchen={detail?.id} onclose={handleClose} mutate={mutateData}/>
            }
            />
        </div>
    )
}
export default HomeAdmin