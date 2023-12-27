"use client";
import React, { useState } from "react";
import Image from "next/image";
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
  PlusCircleOutlined
} from "@ant-design/icons";
import LogoutButton from "#/app/Component/button";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { regularClassRepository } from "#/repository/regularClass";

const { Option } = Select;

const ProfileKitchen = () => {
  const router = useRouter();
  const [form] = useForm();
  const data = {
    Nama: "Dapur Rey",
    Email: "Darey@admin.com",
    Chef: 10,
  };
  
  const [legalitasFileList, setLegalitasFileList] = useState([]);

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    router.push("login");
  };

  const formPassword = () => {
    setVisiblePassword(true);
  };

  const [visible, setVisible] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleCancelPassword = () => {
    setVisiblePassword(false);
  };

  const onFinishPassword = (values: any) => {
    console.log("Form values:", values);
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

  return (
    <div>
      <Modal
        footer={null}
        title="Informasi Kitchen Studio"
        visible={visibleProfile}
        onCancel={handleCancelprofile}
      >
        <Input prefix={<UserOutlined />} placeholder="Nama Kitchen Studio" />
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          style={{ marginTop: "1rem" }}
        />
        <Input
          prefix={<PhoneOutlined />}
          placeholder="WhatsApp Number"
          style={{ marginTop: "1rem" }}
        />
        <Select
          placeholder="Jumlah Chef"
          style={{ width: "100%", marginTop: "1rem" }}
        >
              {[...Array(10)].map((_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
        </Select>

        <Form.Item
          className="w-[100%] mt-4 mb-[-4]"
          name="legalitas"
          rules={[{ required: true, message: "Silakan pilih file legalitas" }]}
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
        </Form.Item>
        <Input
          prefix={<EnvironmentOutlined />}
          placeholder="Alamat"
          style={{ marginTop: "1rem" }}
        />
        <div className="flex justify-between mt-6">
          <Image
            className=" rounded"
            src="/assets/galeri1.png"
            width={200}
            height={200}
            alt="Gambar Pengguna"
          />
          <FullRoundedButton text="Tambah Foto" icons={<PlusCircleOutlined />} />
        </div>
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
      </Modal>
      <Modal
        footer={null}
        title="Ubah Password"
        visible={visiblePassword}
        // onOk={handleOk}
        onCancel={handleCancelPassword}
      >
        <Form form={form} layout="vertical" onFinish={onFinishPassword}>
          <Form.Item name="password lama">
            <Input type="password" placeholder="Masukan Password Lama" />
          </Form.Item>
          <Form.Item name="password baru">
            <Input type="password" placeholder="Masukan Password Baru" />
          </Form.Item>
          <Form.Item name="konfirmasi password">
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
            alt="Gambar Pengguna"
          />
        </Form.Item>
      </Modal>
      <div className=" py-20 flex w-[70%] m-36 rounded-xl">
        <div className=" mx-14 mt-14">
          <Image
            className=" rounded"
            src="/assets/account.png"
            width={150}
            height={150}
            alt="Gambar Pengguna"
          />
        </div>
        <div>
          <div className="flex mb-12 justify-between">
            <div className="text-3xl font-extrabold">{data.Nama}</div>
            <FullRoundedButton
              text="Ubah Profile"
              icons={<EditOutlined />}
              onclick={showModal}
            />
          </div>
          <table>
            <tbody className="flex flex-col gap-4">
              <tr>
                <td className="w-48">Email</td>
                <td>:</td>
                <td className="pl-8">{data.Email}</td>
              </tr>
              <tr>
                <td className="w-48">Password</td>
                <td>:</td>
                <td className="pl-8">
                  <FullRoundedButton
                    text="Ubah Password"
                    icons={<EditOutlined />}
                    onclick={formPassword}
                  />
                </td>
              </tr>
              <tr>
                <td className="w-48">Jumlah Chef</td>
                <td>:</td>
                <td className="pl-8">{data.Chef}</td>
              </tr>
              <tr>
                <td className="w-48">Alamat</td>
                <td>:</td>
                <td className="pl-8">{data.Email}</td>
              </tr>
              <tr>
                <td className="w-48">WhatsApp</td>
                <td>:</td>
                <td className="pl-8">08814550324</td>
              </tr>
              <tr>
                <td className="w-48">Legalitas</td>
                <td>:</td>
                <td className="pl-8">
                  <FullRoundedButton
                    text="Lihat Legalitas"
                    icons={<EyeOutlined />}
                    onclick={handleLegalitas}
                  />
                </td>
              </tr>
              <tr>
                <td className="w-48">Galeri</td>
                <td>:</td>
              </tr>
            </tbody>
          </table>
          <div className="flex">
            {gambar.map((item, index) => {
              return (
                <div>
                  <Image
                    key={index}
                    className=" rounded"
                    src={`/assets/${item}`}
                    width={150}
                    height={150}
                    alt={`Image ${index}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="fixed top-8 right-36">
        <LogoutButton
          text="Keluar"
          icons={<LogoutOutlined />}
          onclick={handleLogOut}
        />
      </div>
    </div>
  );
};
export default ProfileKitchen;
