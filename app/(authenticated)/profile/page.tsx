"use client";

import FullRoundedButton from "#/app/Component/fullRoundedButton";
import Image from "next/image";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import {
  EditOutlined,
  LogoutOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import LogoutButton from "#/app/Component/button";
import { useRouter } from "next/navigation";

const { Option } = Select;

const Profile = () => {
  const [email, setEmail] = useState("trainee@gmail.com");
  const router = useRouter();
  const token = localStorage.getItem("access_token");

  const [form] = Form.useForm();
  const [gender, setGender] = useState("Pria");

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };
  const onFinishPassword = (values: any) => {
    console.log("Form values:", values);
  };

  const handleGenderChange = (value: any) => {
    setGender(value);
  };

  if (!token) {
    alert("silahkan login");
  }

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    router.push("login");
  };
  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const showModal = () => {
    setVisible(true);
  };
  const showModalPassword = () => {
    setVisiblePassword(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancelPassword = () => {
    setVisiblePassword(false);
  };
  return (
    <div className="flex w-[100%]">
      <div>
        <Modal
          footer={null}
          title="Ubah Password"
          visible={visiblePassword}
          // onOk={handleOk}
          onCancel={handleCancelPassword}
        >
          <Form form={form} layout="vertical" onFinish={onFinishPassword}>
          <Form.Item name="password lama">
              <Input placeholder="Masukan Password Lama" />
            </Form.Item>
            <Form.Item name="password baru">
              <Input placeholder="Masukan Password Baru" />
            </Form.Item>
            <Form.Item name="konfirmasi password">
              <Input placeholder="Konfirmasi Password Baru" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          footer={null}
          title="Ubah Profile"
          visible={visible}
          // onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="nama">
              <Input placeholder="Nama Trainee" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="email">
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="whatsapp">
              <Input prefix={<PhoneOutlined />} placeholder="WhatsApp Number" />
            </Form.Item>
            <Form.Item name="gender">
              <Select defaultValue="Pria" onChange={handleGenderChange}>
                <Option value="Pria">Pria</Option>
                <Option value="Wanita">Wanita</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="Tanggal lahir"
              rules={[
                { required: true, message: "Silakan pilih tanggal lahir!" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Tanggal Lahir"
                // prefix={<CalendarOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="w-[65%] ml-20">
        <div className="flex bg-orange-200 rounded-3xl mt-20">
          <div className=" ml-14 mt-14">
            <Image
              className=" rounded"
              src="/assets/account.png"
              width={150}
              height={150}
              alt="Gambar Pengguna"
            />
          </div>
          <div className=" ps-8 mt-14">
            <div className=" text-3xl font-bold mb-10">Nama Trainee</div>
            <table>
              <tbody className="flex flex-col gap-4 text-xl">
                <tr>
                  <td className=" w-48">Email</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">No. Whatsapp</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">Gender</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">Tanggal Lahir</td>
                  <td>:</td>
                  <td className=" pl-20">{email}</td>
                </tr>
                <tr>
                  <td className="w-48">Password</td>
                  <td>:</td>
                  <td className=" pl-20">
                    <FullRoundedButton
                      text="Ubah Password"
                      icons={<EditOutlined />}
                      onclick={showModalPassword}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="my-28">
              <FullRoundedButton
                text="Ubah Profile"
                icons={<EditOutlined />}
                onclick={showModal}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-20 mt-10">
        <LogoutButton
          text="Keluar"
          icons={<LogoutOutlined />}
          onclick={handleLogOut}
        />
      </div>
    </div>
  );
};

export default Profile;
