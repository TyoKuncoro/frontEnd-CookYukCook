"use client";
import ModalCustom from "#/app/Component/createPengajuan";
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
        legality: string;
    }
    const approve = async (idUsers, kitchenName) => {
        try{
            await usersRepository.manipulatedData.approveKitchen(idUsers);
            mutateData()
            message.success(`${kitchenName} telah disetujui`)
        }catch(e){
            message.error('Gagal menyetujui studio masak');
        }
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
                    width={200}
                    src={`http://localhost:3222/kitchen-studio/upload-legalitas/${record.legality}/image`}
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
                    <a key={record.users.id} onClick={()=>approve(record.users.id, record.users.name)}>Menyetujui</a>
                    <a key={record.users.id} onClick={() => handleOpen(record)}>Menolak</a>
                </Space>
            )
        }
    ]
    return (
        <div className="bg-white p-20 w-full space-y-16">
            <p className="text-2xl font-bold">Verifikasi Studio Masak</p>
            <Table columns={columns} dataSource={data?.data} />
            <ModalCustom
            width={600}
            title = {'Alasan Menolak Studio Masak'}
            closeModal={handleClose}
            visible={showModal}
            content= {
                <RejectKitchen onClose={handleClose} idUsers={detail?.users?.id} mutate={mutateData}/>
            }
            />
        </div>
    )
}
export default HomeAdmin