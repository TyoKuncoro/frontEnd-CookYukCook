"use client";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import LogoutButton from "#/app/Component/button";
import { useRouter } from "next/navigation";
import ProfileKitchen from "../profile-kitchen/page";
import { parseJwt } from "../../Component/Helper/convert";
import ProfileAdmin from "../profile-admin/page";
import { usersRepository } from "#/repository/user";
import { mutate } from "swr";

const { Option } = Select;

const Profile = () => {
  const router = useRouter();
  const [dateBirth, setDateBirth] = useState("YYYY-MM-DD");
  const [form] = Form.useForm();
  const [gender, setGender] = useState("Pria");

  const handleGenderChange = (value: any) => {
    setGender(value);
  };

  const token = localStorage.getItem("access_token");
  if (!token) {
    setTimeout(message.error("Anda belum login, silahkan login"), 2000);
    router.push("login");
  }

  // const handleLogOut = () => {
  //   localStorage.removeItem("access_token");
  //   router.push("login");
  // };
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
  let name: string = "";
  let id: string = "";
  console.log(token, "token");
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
        setVisiblePassword(false);
        message.success("Password Berhasil Diganti");
      } catch (e) {
        throw e;
      }
    }
  };

  const onFinishKitchen = async (values: any) => {
    // message.error("wiring is in process");
    // console.log(values, "Form values:");
    // console.log(dateBirth, "ini tanggal lahir");
    let data = {
      nama: dataUser?.data?.name,
      email: values.email,
      phoneNumber: values.whatsapp,
      gender: values.gender,
      dateOfBirth: dateBirth,
    };
    console.log(data, "ini data");
    try {
      const updateUser = await usersRepository.manipulatedData.updateUsers(
        id,
        data
      );
      console.log(updateUser, "ini update user");
      message.success("Data Berhasil Diubah");
      setVisible(false);
      mutate(usersRepository.url.getUsersById(id));
    } catch (e) {
      message.error("Mengubah Data Gagal");
      console.log(e, "ini error");
    }
  };

  const { data: dataUser } = usersRepository.hooks.getUsersById(id);
  // console.log(dataUser, "ini data trainee");
  console.log(dataUser?.data, "ini data");

  const changeTanggalLahir = (date: any, dateString: any) => {
    setDateBirth(dateString);
  };

  return role === "Trainee" ? (
    <div className="flex w-[100%]">
      <div>
        <Modal
          footer={null}
          title="Ubah Kata Sandi"
          visible={visiblePassword}
          // onOk={handleOk}
          onCancel={handleCancelPassword}
        >
          <Form form={form} layout="vertical" onFinish={onFinishPassword}>
            {/* <Form.Item name="passwordLama">
              <Input type="password" placeholder="Masukan Password Lama" />
            </Form.Item> */}
            <Form.Item label="Kata Sandi Baru" name="passwordBaru">
              <Input.Password type="password" placeholder="Masukan Password Baru" />
            </Form.Item>
            <Form.Item label="Konfirmasi Kata Sandi Baru" name="konfirmasiPassword">
              <Input.Password type="password" placeholder="Konfirmasi Password Baru" />
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
          title="Ubah Profil"
          visible={visible}
          // onOk={handleUpdateProfile}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" onFinish={onFinishKitchen}>
            {/* <Form.Item
              name="nama"
              rules={[{ required: true, message: "Nama Tidak Boleh Kosong" }]}
            >
              <Input placeholder="Nama Trainee" prefix={<UserOutlined />} />
            </Form.Item> */}
            <Form.Item
            label="Email"
              name="email"
              rules={[
                { required: true, message: "Email Tidak Boleh Kosong" },
                { type: "email", message: "Alamat email tidak valid!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
            label="No WhatsApp"
              name="whatsapp"
              rules={[
                {
                  required: true,
                  message: "Nomor Whatsapp Tidak Boleh Kosong",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Nomor Whatsapp" />
            </Form.Item>
            <Form.Item
            label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Jenis Kelamin Tidak Boleh Kosong" },
              ]}
            >
              <Select
                placeholder="Silahkan Pilih Jenis Kelamin"
                onChange={handleGenderChange}
              >
                <Option value="Pria">Pria</Option>
                <Option value="Wanita">Wanita</Option>
              </Select>
            </Form.Item>
            <Form.Item
            label="Tanggal Lahir"
              name="TanggalLahir"
              rules={[
                { required: true, message: "Tanggal Lahir Tidak Boleh Kosong" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                placeholder="Tanggal Lahir"
                onChange={changeTanggalLahir}
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
          <div className="flex flex-col ">
            <div className=" ml-14 mt-14">
              <Image
                className=" rounded"
                src="/assets/account.png"
                width={150}
                height={150}
                alt="Gambar Pengguna"
              />
            </div>
            <div className="ml-14 mt-5">
              <FullRoundedButton
                text="Ubah Profil"
                icons={<EditOutlined />}
                onclick={showModal}
              />
            </div>
          </div>
          <div className=" ps-8 mt-14">
            <div className=" text-3xl font-bold mb-10">
              {dataUser?.data?.name}
            </div>
            <table>
              <tbody className="flex flex-col gap-6 text-xl">
                <tr>
                  <td className=" w-48">Email</td>
                  <td>:</td>
                  <td className=" pl-28">{dataUser?.data?.email}</td>
                </tr>
                <tr>
                  <td className="w-48">No. Whatsapp</td>
                  <td>:</td>
                  <td className=" pl-28">{dataUser?.data?.phoneNumber}</td>
                </tr>
                <tr>
                  <td className="w-48">Gender</td>
                  <td>:</td>
                  <td className=" pl-28">{dataUser?.data?.gender}</td>
                </tr>
                <tr>
                  <td className="w-48">Tanggal Lahir</td>
                  <td>:</td>
                  <td className=" pl-28">{dataUser?.data?.dateOfBirth}</td>
                </tr>
                <tr>
                  <td className="w-48">Kata Sandi</td>
                  <td>:</td>
                  <td className=" pl-28">
                    <FullRoundedButton
                      text="Ubah Kata Sandi"
                      icons={<EyeOutlined />}
                      onclick={showModalPassword}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className="ml-20 mt-10">
        <LogoutButton
          text="Keluar"
          icons={<LogoutOutlined />}
          onclick={handleLogOut}
        />
      </div> */}
    </div>
  ) : role === "Kitchen Studio" ? (
    <ProfileKitchen />
  ) : (
    <ProfileAdmin />
  );
};

export default Profile;
