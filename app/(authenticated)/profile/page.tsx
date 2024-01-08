"use client";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
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
  Image
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
  console.log(dataUser?.data?.photo, "ini data user")
  // console.log(dataUser?.data?.photo, "ini dataaa");

  const changeTanggalLahir = (date: any, dateString: any) => {
    setDateBirth(dateString);
  };
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%', // initial border-radius
  };

  const imageStyle = {
    width: '100%', // adjust the width as needed
    height: 'auto', // maintain aspect ratio
    transition: 'border-radius 0.3s', // add transition for smooth hover effect
  };
  const handleMouseEnter = () => {
    imageStyle.borderRadius = '50%'; // set rounded border on hover
  };

  const handleMouseLeave = () => {
    imageStyle.borderRadius = '50%'; // revert to initial rounded border on leave
  };
  return role === "Trainee" ? (
    <div className="m-auto flex justify-center items-center h-full w-[100%]">
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
            <Form.Item name="passwordBaru">
              <Input.Password
                type="password"
                placeholder="Masukan Password Baru"
              />
            </Form.Item>
            <Form.Item name="konfirmasiPassword">
              <Input.Password
                type="password"
                placeholder="Konfirmasi Password Baru"
              />
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
      <div className="flex gap-12 bg-white border border-solid border-slate-100 shadow-xl rounded-sm">
        <div className="flex flex-col items-center justify-center rounded p-10">
          <div>
            {dataUser?.data?.photo &&(
              <Image
                className="rounded-md"
                src={`http://localhost:3222/users/upload-profile/${dataUser?.data.photo}/image`}
                width={250}
                height={250}
                alt="Gambar Pengguna"
              />

            )}
          </div>
          <div className="mt-10 text-xl">
            <FullRoundedButton
              text="Ubah Profile"
              icons={<EditOutlined />}
              onclick={showModal}
            />
          </div>
        </div>
        <div>
          <div className="text-justify bg-white py-7 px-10 rounded w-[900px]">
            <div className="flex">
              <p className="text-4xl font-bold">{dataUser?.data?.name}</p>
                <Tag color="green" className="mt-2  ml-10 text-xl h-8">
                  {dataUser?.data?.status}
                </Tag>
            </div>
            <div className="flex text-xl">
              <p className=" font-semibold mr-5">No WhatsApp</p>
              <p className="mr-2"></p>
              <p>{dataUser?.data?.phoneNumber}</p>
            </div>
            <div className="flex text-xl">
              <p className=" font-semibold mr-20">Gender</p>
              
                            <p className="mr-2"></p>
              <p>
                {dataUser?.data?.gender === "Wanita" ?(
                  <Tag className="text-xl" color="pink">{dataUser?.data?.gender}</Tag>
                ):(
                  <Tag className="text-xl" color="blue">{dataUser?.data?.gender}</Tag>
                )}
                </p>
            </div>
            <div className="flex text-xl">
              <p className=" font-semibold mr-20">Alamat</p>
              <p className="mr-2"></p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Debitis minima iure nisi architecto odio ex consequuntur
                eligendi ratione natus quisquam.
              </p>
            </div>
            <div className="flex text-xl">
              <p className=" font-semibold mr-6">Tanggal Lahir</p>
              <p className="mr-2"></p>
              <p>{dataUser?.data?.dateOfBirth}</p>
            </div>
            <div className="flex text-xl">
              <p className=" font-semibold mr-24">Email</p>
              <p className="mr-2"></p>
              <p>{dataUser?.data?.email}</p>
            </div>
            <div className="flex text-xl">
              <p className=" font-semibold mr-12">Kata Sandi</p>
              <p className="mr-2"></p>
              <p className="text-xl">
                <FullRoundedButton
                  text="Ubah Password"
                  icons={<EyeOutlined />}
                  onclick={showModalPassword}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : role === "Kitchen Studio" ? (
    <ProfileKitchen />
  ) : (
    <ProfileAdmin />
  );
};

export default Profile;
