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
  UsergroupDeleteOutlined
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
  // console.log(localStorage.getItem("access_token"), "ini token tai")
  const token = localStorage.getItem("access_token");
  let role: string = "Admin";
  console.log(token, "hayoo udah nemu tokennya ");
  if (token) {
    role = parseJwt(token).role;
    console.log(role, "role coook");
  }


  const menu: MenuProps["items"] = [
    {
    key: `/file`,
    icon: <UsergroupDeleteOutlined />,
    label: `Dashboard`,
    },
  ]

  return (
    <Layout className=" bg-white">
      <Sider
        width={220}
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
          defaultSelectedKeys={["/home"]}
          // defaultOpenKeys={['sub1']}
          style={{
            height: "100%",
            borderRight: 0,
            background: "#FFEBD1",
            fontWeight: "bold",
            color: "#FF7D04", 
          }}
          items={menu}
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
  );
};

export default AuthenticatedLayout;
