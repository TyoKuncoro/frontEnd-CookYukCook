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
  message,
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
import ProfileKitchen from "../profile-kitchen/page";
import { parseJwt } from "../../Component/Helper/convert";
import ProfileAdmin from "../profile-admin/page";
import { usersRepository } from "#/repository/user";

const { Option } = Select;

const Profile = () => {
  const [email, setEmail] = useState("trainee@gmail.com");
  const router = useRouter();

  const [form] = Form.useForm();
  const [gender, setGender] = useState("Pria");

  const onFinishKitchen = async(values: any) => {
    message.error('wiring is in process')
    setVisible(false)
    // console.log(values, "Form values:");
    //     nama: values.nama,
    //     email: values.email,
    //     phoneNumber: values.whatsapp,
    //     gender: values.gender,
    //     tanggalLahir: values.$y + values.$M + values.$D

  };

  const handleGenderChange = (value: any) => {
    setGender(value);
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    setTimeout(message.error("Anda belum login, silahkan login"), 2000);
    router.push("login");
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

  let role: string = "";
  let id: string = "";
  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
    // console.log(role, "role coookecoke");
  }
  const onFinishPassword = async (values: any) => {
    if (values.passwordBaru !== values.konfirmasiPassword) {
      message.error("Konfirmasi Password Gagal");
    } else {
      try {
        const data = { password: values.konfirmasiPassword };
        const updatePassword =
          await usersRepository.manipulatedData.updatePassword(id, data);
        console.log(updatePassword, "password");
        setVisiblePassword(false)
        message.success('Password Berhasil Diganti')
      } catch (e) {
        throw e
      }
    }
  };

  const data: any = {
    whatsapp: "0895320076636",
    gender: "Wanita",
    tanggaLahir: "2003-12-24",
  };
  const handleUpdateProfile = async(values: any) => {
  }

  return role === "Trainee" ? (
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
            <Form.Item name="passwordLama">
              <Input type="password" placeholder="Masukan Password Lama" />
            </Form.Item>
            <Form.Item name="passwordBaru">
              <Input type="password" placeholder="Masukan Password Baru" />
            </Form.Item>
            <Form.Item name="konfirmasiPassword">
              <Input type="password" placeholder="Konfirmasi Password Baru" />
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
          // onOk={handleUpdateProfile}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" onFinish={onFinishKitchen}>
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
              name="TanggalLahir"
              // rules={[
              //   { required: true, message: "Silakan pilih tanggal lahir!" },
              // ]}
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
        <div className="flex rounded-3xl mt-20">
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
            <div className=" text-3xl font-bold mb-10">Cecilila Siregar</div>
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
                  <td className=" pl-20">{data.whatsapp}</td>
                </tr>
                <tr>
                  <td className="w-48">Gender</td>
                  <td>:</td>
                  <td className=" pl-20">{data.gender}</td>
                </tr>
                <tr>
                  <td className="w-48">Tanggal Lahir</td>
                  <td>:</td>
                  <td className=" pl-20">{data.tanggaLahir}</td>
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
  ) : role === "Kitchen Studio" ? (
    <ProfileKitchen />
  ) : (
    <ProfileAdmin />
  );
};

export default Profile;
