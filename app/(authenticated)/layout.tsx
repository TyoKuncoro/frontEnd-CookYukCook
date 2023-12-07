"use client";

import React from "react";
import Image from "next/image";
import {
  HomeFilled,
  InfoCircleFilled,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu: MenuProps["items"] = [
    {
      key: `/home`,
      icon: <HomeFilled />,
      label: `Dashboard`,
    },
    {
      key: `/about`,
      icon: <InfoCircleFilled />,
      label: `About`,
    },
  ];

  return (
    <Layout>
      <Layout>
        <Sider width={200} style={{ background: "#FFEBD1", borderTopRightRadius: "50" }}>
          <Image
            style={{marginLeft: "20px", marginTop: "13px", marginBottom: "45px"}}
            src="/assets/maskot.png"
            width={150}
            height={150}
            alt="Cook Yuk Cook"
          />
          <Menu
            mode="inline"
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            style={{ height: "100%", borderRight: 0,  background: "#FFEBD1"  }}
            items={menu}
            onClick={({ key }) => {
              router.push(key);
              // console.log(`key ${key} route not found`);
            }}
          />
        </Sider>
        <Layout
          style={{ padding: "0 24px 24px", height: "calc(100vh - 64px)" }}
        >
          <Content
            style={{
              padding: 24,
              margin: "16px 0 0 0",
              minHeight: 200,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
