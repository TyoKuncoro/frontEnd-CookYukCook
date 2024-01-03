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
  PlusCircleOutlined,
} from "@ant-design/icons";
import LogoutButton from "#/app/Component/button";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { regularClassRepository } from "#/repository/regularClass";
import { usersRepository } from "#/repository/user";
import { parseJwt } from "#/app/Component/Helper/convert";
import { kitchenRepository } from "#/repository/kitchen";

const { Option } = Select;

const ProfileKitchen = () => {
  const token = localStorage.getItem("access_token");

  const [Nama, setNama] = useState("Kitchen Tyo");
  const [Email, setEmail] = useState("tyo@kitchen.com");
  const [Chef, setChef] = useState(10);
  const [Alamat, setAlamat] = useState("Bandung");
  const [Whatsapp, setWhatsapp] = useState("08814550324");
  // const [nama, setnama] = useState("");
  // const [email, setemail] = useState("");
  // const [chef, setchef] = useState(0);
  // const [alamat, setalamat] = useState("");
  // const [whatsapp, setwhatsapp] = useState("");

  const router = useRouter();
  const [form] = useForm();
  const data = {
    // Nama: "Dapur Rey",
    // Email: "Darey@admin.com",
    // Chef: 10,
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
        setVisiblePassword(false);
        message.success("Password Berhasil Diganti");
      } catch (e) {
        throw e;
      }
    }
  };

  const onFinish = (values: any) => {
    console.log(values, "Values");
    setNama(values.kitchen);
    setWhatsapp(values.whatsapp);
    setChef(values.chef);
    setAlamat(values.alamat);
    setEmail(values.email);
    setVisibleProfile(false);
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

  const {data: dataKitchen} = usersRepository.hooks.getUsersById(id);
  // console.log(dataKitchen, 'ini data kitchen')

  return (
    <div>
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
          <Form.Item
            name="kitchen"
            rules={[
              { required: true, message: "Nama Tidak Boleh Kosong" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nama Kitchen Studio"
            />
          </Form.Item>
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
            rules={[
              { required: true, message: "Alamat Tidak Boleh Kosong" },
            ]}
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
            <div className="text-3xl font-extrabold">{dataKitchen?.data?.name}</div>
          </div>
          <table>
            <tbody className="flex flex-col gap-6">
              <tr>
                <td className="w-48">Email</td>
                <td>:</td>
                <td className="pl-8">{dataKitchen?.data?.email}</td>
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
                <td className="pl-8">{dataKitchen?.data?.numberOfChef}</td>
              </tr>
              <tr>
                <td className="w-48">Alamat</td>
                <td>:</td>
                <td className="pl-8">{dataKitchen?.data?.address}</td>
              </tr>
              <tr>
                <td className="w-48">WhatsApp</td>
                <td>:</td>
                <td className="pl-8">{dataKitchen?.data?.phoneNumber}</td>
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
              {/* <tr>
                <td className="w-48">Galeri</td>
                <td>:</td>
              </tr> */}
            </tbody>
          </table>
          {/* <div className="flex">
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
          </div> */}
          <div className="mt-16">
            <FullRoundedButton
              text="Ubah Profile"
              icons={<EditOutlined />}
              onclick={showModal}
            />
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
