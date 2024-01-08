"use client";
import React, { useState } from "react";
import FullRoundedButton from "#/app/Component/fullRoundedButton";
import {
  EditOutlined,
  EyeOutlined,
  LogoutOutlined,
  EnvironmentOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import LogoutButton from "#/app/Component/button";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Modal, Select, Tag, Upload, message, Image } from "antd";
import { useForm } from "antd/es/form/Form";
import { regularClassRepository } from "#/repository/regularClass";
import { usersRepository } from "#/repository/user";
import { parseJwt } from "#/app/Component/Helper/convert";
import { kitchenRepository } from "#/repository/kitchen";
import { mutate } from "swr";

const { Option } = Select;

const ProfileKitchen = () => {
  const token = localStorage.getItem("access_token");

  const router = useRouter();
  const [form] = useForm();

  const [legalitasFileList, setLegalitasFileList] = useState([]);

  // const handleLogOut = () => {
  //   localStorage.removeItem("access_token");
  //   router.push("login");
  // };

  const formPassword = () => {
    setVisiblePassword(true);
  };

  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleCancelPassword = () => {
    setVisiblePassword(false);
  };
  let role: string = "";
  let id: string = "";
  if (token) {
    role = parseJwt(token).role;
    id = parseJwt(token).id;
    console.log(id, "ini id");
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

  const onFinish = async (values: any) => {
    let data1 = {
      nama: dataKitchen?.data?.name,
      email: values.email,
      phoneNumber: values.whatsapp,
      numberOfChef: values.chef,
      address: values.alamat,
    };
    // console.log(data1)

    try {
      const updateKitchen = await usersRepository.manipulatedData.updateUsers(
        id,
        data1
      );
      console.log(updateKitchen, "ini data update kitchen");
      message.success("Data Berhasil Diubah");
      setVisibleProfile(false);
      mutate(usersRepository.url.getUsersById(id));
    } catch (e) {
      message.error("Mengubah Data Gagal");
      console.log(e, "ini error");
    }
  };

  const handleLegalitas = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const gambar = ["galeri1.png", "galeri2.png", "galeri3.png", "galeri4.png"];

  const [visibleProfile, setVisibleProfile] = useState(false);

  const showModal = () => {
    setVisibleProfile(true);
  };

  const handleCancelprofile = () => {
    setVisibleProfile(false);
  };

  const uploadProps = {
    maxCount: 1,
    beforeUpload: (file: any) => {
      // Validasi sebelum upload
      return false;
    },
  };

  const { data: dataKitchen } = kitchenRepository.hooks.getKitchenByUser();

  console.log(dataKitchen?.data, "ini data kitchen");

  return (
    <div className="m-auto flex justify-center items-center h-full w-[100%]">
      <Modal
        footer={null}
        title="Informasi Kitchen Studio"
        visible={visibleProfile}
        onCancel={handleCancelprofile}
      >
        <Form
          form={form}
          name="edit profile"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 32 }}
          initialValues={{ remember: true }}
        >
          {/* <Form.Item
            name="kitchen"
            rules={[{ required: true, message: "Nama Tidak Boleh Kosong" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nama Kitchen Studio"
            />
          </Form.Item> */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Alamat Email Tidak Boleh Kosong" },
              { type: "email", message: "Alamat email tidak valid!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              style={{ marginTop: "1rem" }}
            />
          </Form.Item>
          <Form.Item
            name="whatsapp"
            rules={[
              { required: true, message: "Nomor Whatsapp Tidak Boleh Kosong" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Nomor Whatsapp"
              style={{ marginTop: "1rem" }}
            />
          </Form.Item>
          <Form.Item
            name="chef"
            rules={[
              { required: true, message: "Jumlah Chef Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="Jumlah Chef" type="number" className="mt-4" />
          </Form.Item>
          {/* <Form.Item
            className="w-[100%] mt-4 mb-[-4]"
            name="legalitas"
            rules={[
              { required: true, message: "Silakan pilih file legalitas" },
            ]}
          >
            <Upload
              {...uploadProps}
              fileList={legalitasFileList}
              onChange={({ fileList }: any) => setLegalitasFileList(fileList)}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Pilih Legalitas
              </Button>
            </Upload>
          </Form.Item> */}
          <Form.Item
            name="alamat"
            rules={[{ required: true, message: "Alamat Tidak Boleh Kosong" }]}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              placeholder="Alamat"
              style={{ marginTop: "1rem" }}
            />
          </Form.Item>
          {/* <div className="flex justify-between mt-6">
            <Image
              className=" rounded"
              src="/assets/galeri1.png"
              width={200}
              height={200}
              alt="Gambar Pengguna"
            />
            <FullRoundedButton
              text="Tambah Foto"
              icons={<PlusCircleOutlined />}
            />
          </div> */}
          <Form.Item>
            <Button
              className="mt-4"
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#FF7D04", borderColor: "#FF7D04" }}
            >
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        footer={null}
        title="Ubah Password"
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
        title="Legalitas"
        visible={visible}
        onCancel={handleCancel}
      >
        <Form.Item>
          <Image
            className=" rounded"
            src="/assets/legalitas-foto 1.png"
            width={420}
            height={600}
            alt="Gambar Legalitas"
          />
        </Form.Item>
      </Modal>
        <div className="flex gap-12 bg-white border border-solid border-slate-100 shadow-xl rounded-sm">
          <div className="flex flex-col items-center justify-center rounded p-10">
            <div>
              {dataKitchen?.data?.photo && (
                <Image
                  className="rounded-md"
                  src={`http://localhost:3222/kitchen-studio/upload-logo/${dataKitchen?.data.logos}/image`}
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
                <p className="text-4xl font-bold">{dataKitchen?.data?.users.name}</p>
                <Tag color="green" className="mt-2  ml-10 text-xl h-8">
                  {dataKitchen?.data?.status}
                </Tag>
              </div>
              <div className="flex text-xl">
                <p className=" font-semibold mr-5">No WhatsApp</p>
                <p className="mr-2"></p>
                <p>{dataKitchen?.data?.phoneNumber}</p>
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
                <p className=" font-semibold mr-24">Email</p>
                <p className="mr-2"></p>
                <p>{dataKitchen?.data?.users.email}</p>
              </div>
              <div className="flex text-xl">
                <p className=" font-semibold mr-12">Kata Sandi</p>
                <p className="mr-2"></p>
                <p className="text-xl">
                  <FullRoundedButton
                    text="Ubah Password"
                    icons={<EyeOutlined />}
                    onclick={formPassword}
                  />
                </p>
              </div>
              <div className="flex text-xl">
                <p className=" font-semibold mr-12">Legalitas</p>
                <p className="mr-2"></p>
                <p className="text-xl">
                  <FullRoundedButton
                    text="Lihat Legalitas"
                    icons={<EyeOutlined />}
                    onclick={handleLegalitas}
                  />
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
                <p className=" font-semibold mr-20">Jumlah Chef</p>
                <p className="mr-2"></p>
                <p>
                  {dataKitchen?.data?.numberOfChefs} orang
                </p>
              </div>
            </div>
        </div>
      </div>
</div>
  )
};
export default ProfileKitchen;
