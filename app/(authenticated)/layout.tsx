"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HomeOutlined,
  AuditOutlined,
  MessageOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  BookOutlined,
  WalletOutlined,
  ClockCircleOutlined,
  BellOutlined,
  LogoutOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
import { parseJwt } from "../Component/Helper/convert";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  // const [menu, setMenu] = useState()
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const token = localStorage.getItem("access_token");
  let role: string = 'kosong'
  console.log(token, "hayoo udah nemu tokennya ");
  if (token){
    role = parseJwt(token).role;
    console.log(role, "role coook");
  }
  const menu : MenuProps["items"] = [
    {
      key: `/home`,
      icon: <HomeOutlined />,
      label: `Dashboard`,
    },
    {
      key: `/regular`,
      icon: <AuditOutlined />,
      label: `Kelas Regular`,
    },
    {
      key: `/private`,
      icon: <BookOutlined />,
      label: `Kelas Private`,
    },
    {
      key: `/pembayaran`,
      icon: <WalletOutlined />,
      label: `Pembayaran`,
    },
    {
      key: `/riwayat`,
      icon: <ClockCircleOutlined />,
      label: `Riwayat Pembayaran`,
    },
    {
      key: `/profile`,
      icon: <UserOutlined />,
      label: `Profile`,
    },
    {
      key: `notif`,
      icon: <BellOutlined />,
      label: `Notifikasi`,
    },
    {
      key: `/chat`,
      icon: <MessageOutlined />,
      label: `Chat`,
    },
    {
      key: `/keluar`,
      icon: <LogoutOutlined />,
      label: `Logout`,
    },
  ]
  const menuAdmin: MenuProps["items"] = [
    {
      key: `/home`,
      icon: <HomeOutlined />,
      label: `Dashboard`,
    },
    {
      key: `/regular`,
      icon: <AuditOutlined />,
      label: `Kelas Regular`,
    },
    {
      key: `/private`,
      icon: <BookOutlined />,
      label: `Kelas Private`,
    },
    {
      key: `/pembayaran`,
      icon: <WalletOutlined />,
      label: `Pembayaran`,
    },
    {
      key: `/riwayat`,
      icon: <ClockCircleOutlined />,
      label: `Riwayat Pembayaran`,
    },
    {
      key: `/profile`,
      icon: <UserOutlined />,
      label: `Profile`,
    },
    {
      key: `notif`,
      icon: <BellOutlined />,
      label: `Notifikasi`,
    },
    {
      key: `/management`,
      icon: <IdcardOutlined />,
      label: `Management Pengguna`,
    },
    {
      key: `/keluar`,
      icon: <LogoutOutlined />,
      label: `Logout`,
    },
  ];

  return (
    // <Layout>
      <Layout className="min-h-screen">
        <Sider
          width={200}
          style={{ background: "#FFEBD1", borderTopRightRadius: "50" }}
        >
          <Image
            style={{
              marginLeft: "20px",
              marginTop: "13px",
              marginBottom: "45px",
            }}
            src="/assets/maskot.png"
            width={150}
            height={150}
            alt="Cook Yuk Cook"
          />
          <Menu className=""
            mode="inline"
            defaultSelectedKeys={['/home']}
            // defaultOpenKeys={['sub1']}
            style={{ height: "100%", borderRight: 0, background: "#FFEBD1" }}
            items={ 
              // menu
              role == "trainee" || "kitchen studio" ? menu : menuAdmin
            }
            onClick={({ key }) => {
              router.push(key);
              // console.log(`key ${key} route not found`);
            }}
          />
        </Sider>
        {/* <Layout
          style={{ padding: "0 24px 24px", height: "calc(100vh - 64px)" }}
        > */}
          {/* <Content
            style={{
              padding: 24,
              margin: "16px 0 0 0",
              minHeight: 200,
              background: colorBgContainer,
            }}
          > */}
            {children}
          {/* </Content> */}
        {/* </Layout> */}
      </Layout> 
  );
};

export default AuthenticatedLayout;
