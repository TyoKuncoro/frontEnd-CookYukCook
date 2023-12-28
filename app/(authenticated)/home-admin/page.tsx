"use client"
import { kitchenRepository } from "#/repository/kitchen";
import { usersRepository } from "#/repository/user";
import { Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";

function HomeAdmin () {
    const status = "pending";
    const {data} = kitchenRepository.hooks.getKitchenPending(status)
    interface DataType {
        key: string;
        users:string;
        // legality: number;
        // address: string;
        // phoneNumber: string;
      }
      
      const columns: ColumnsType<DataType> = [
        
        // {
        //     title: 'Legalitas',
        //     dataIndex: 'legality',
        //     key: 'legality',
        //     render: (_,record) => (
        //         <img src=""/>
        //     )
        //   },
          {
          title: 'Nama Studio Masak',
          dataIndex: 'users',
          key: 'users',
          render: (users) => <p>{users.name}</p>,
        },
        
        {
          title: 'Alamat',
          dataIndex: 'users',
          key: 'address',
          render: (address) => <p>{address.address}</p>,
        },
        // {
        //     title: 'Address',
        //     dataIndex: 'address',
        //     key: 'address',
        //   },
          {
            title: 'No WhatsApp',
            dataIndex: 'users',
            key: 'phoneNumber',
            render: (phoneNumber) => <p>{phoneNumber.phoneNumber}</p>,
          },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   render: (_, record) => (
        //     <Space size="middle">
        //       <a>Invite {record.users.name}</a>
        //       <a>Delete</a>
        //     </Space>
        //   ),
        // },
      ];
    return (
        <div>
            <Table columns={columns} dataSource={data} />;
        </div>
    )
}
export default HomeAdmin;