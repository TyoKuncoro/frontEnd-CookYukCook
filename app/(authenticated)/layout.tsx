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
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
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
  let role: string = "Admin";
  // console.log(token, "hayoo udah nemu tokennya ");
  if (token) {
    role = parseJwt(token).role;
    console.log(role, "role coook");
  }

  const menu: MenuProps["items"] = [
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
      key: `/logout`,
      icon: <LogoutOutlined />,
      label: `Logout`,
    },
  ];
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
      key: `/management`,
      icon: <IdcardOutlined />,
      label: `Management Pengguna`,
    },
    {
      key: `/logout`,
      icon: <LogoutOutlined />,
      label: `Logout`,
    },
  ];
  const pathname = usePathname();
  const reguler = pathname === "/regular";
  console.log(reguler, 'ini pathname');
  
  const path = window.location.pathname;
  return (
    <>
      {reguler ? (
        <Layout className=" bg-white h-[1200px]">
          <Sider
            width={220}
            className="h-full"
            style={{ background: "#FFEBD1", borderTopRightRadius: 60 }}
          >
            <div className="flex py-6 justify-center">
              <Image
                src="/assets/maskot.png"
                width={150}
                height={150}
                alt="Cook Yuk Cook"
              />
            </div>
            <Menu
              className=""
              mode="inline"
              // defaultSelectedKeys={['1']}
              // selectedKeys={[path]}
              defaultOpenKeys={[path]}
              style={{
                height: "auto",
                borderRight: 0,
                background: "#FFEBD1",
                fontWeight: "bold",
                color: "#FF7D04",
              }}
              items={role == "Trainee" || "Kitchen Studio" ? menu : menuAdmin}
              onClick={({ key }) => {
                router.push(key);
                // console.log(`key ${key} route not found`);
              }}
            />
          </Sider>
          <Layout style={{ height: "calc(100vh - 64px)" }}>
            <Content
              style={{
                padding: 24,
                minHeight: 200,
                background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      ) : (
        <Layout className=" bg-white h-full">
          <Sider
            width={220}
            className="h-full"
            style={{ background: "#FFEBD1", borderTopRightRadius: 60 }}
          >
            <div className="flex py-6 justify-center">
              <Image
                src="/assets/maskot.png"
                width={150}
                height={150}
                alt="Cook Yuk Cook"
              />
            </div>
            <Menu
              className=""
              mode="inline"
              // defaultSelectedKeys={['1']}
              // selectedKeys={[path]}
              defaultOpenKeys={[path]}
              style={{
                height: "auto",
                borderRight: 0,
                background: "#FFEBD1",
                fontWeight: "bold",
                color: "#FF7D04",
              }}
              items={role == "Trainee" || "Kitchen Studio" ? menu : menuAdmin}
              onClick={({ key }) => {
                router.push(key);
                // console.log(`key ${key} route not found`);
              }}
            />
          </Sider>
          <Layout style={{ height: "calc(100vh - 64px)" }}>
            <Content
              style={{
                padding: 24,
                minHeight: 200,
                background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default AuthenticatedLayout;
