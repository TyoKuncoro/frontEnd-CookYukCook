"use client";

import React, { useState } from "react";
import { Upload, Input, Button, Form, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { authRepository } from "#/repository/auth";
import { useRouter } from "next/navigation";
import { UploadChangeParam } from "antd/es/upload";
import { UploadFile } from "antd/lib";
const { Option } = Select;

const RegisterKitchen = () => {
  const router = useRouter();
  const [logoFileList, setLogoFileList] = useState([]);
  const [legalitasFileList, setLegalitasFileList] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [legalitas, setLegalitas] = useState<string | null>(null);
  const onFinish = async (values: any) => {
    // Lakukan sesuatu dengan nilai-nilai formulir yang di-submit
    // Lakukan validasi di sini
    console.log("ini values cook", values);
    try {
      const data = {
        level: "Kitchen Studio",
        name: values?.nama,
        email: values?.email,
        phoneNumber: values?.whatsapp,
        password: values?.password,
        address: values?.alamat,
        numberOfChefs: values?.jumlahChef,
        logos: profilePhoto,
        legality: legalitas,
        description: values?.desc,
      };
      const register = await authRepository.manipulateData.register(data);
      console.log(register, "ini hasil register");
      router.push("/login");
    } catch (error) {
      // message.error(error.response.body.message)
    }
  };

  const uploadProps = {
    maxCount: 1,
    beforeUpload: (file: any) => {
      // Validasi sebelum upload
      return false;
    },
  };

  const logoUploadProps = {
    accept: ".png,.jpg,.jpeg",
    beforeUpload: (file: any) => {
      setLogoFileList(file.slice(-1));
      return false; // Prevent default upload behavior
    },
  };

  const legalitasUploadProps = {
    accept: ".pdf",
    beforeUpload: (file: any) => {
      setLegalitasFileList(file);
      return false; // Prevent default upload behavior
    },
  };

  const uploadLogoKitchen = async (
    args: UploadChangeParam<UploadFile<any>>
  ) => {
    const file = args.file;
    try {
      if (file.size && file.size > 2097152) {
        message.error("ukuran file terlalu besar");
      } else {
        if (
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        ) {
          const response = await authRepository.manipulateData.uploadLogo(file);
          console.log(response.body.fileName, "hasilnya");
          setProfilePhoto(response.body.fileName);
          message.success("Foto logo berhasil terupload");
        } else {
          message.error("Extensi file tidak diketahui");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadLegalitas = async (args: UploadChangeParam<UploadFile<any>>) => {
    const file = args.file;
    try {
      if (file.size && file.size > 2097152) {
        message.error("ukuran file terlalu besar");
      } else {
        if (
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        ) {
          const response = await authRepository.manipulateData.uploadLegalitas(
            file
          );
          console.log(response.body.fileName, "hasilnya");
          setLegalitas(response.body.fileName);
          message.success("Foto legalitas berhasil terupload");
        } else {
          message.error("Extensi file tidak diketahui");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem("access_token");
  if (token) {
    router.push("/home");
  }

  return (
    <div className="flex place-content-center my-20">
      <div>
        <Image
          className="rounded-l-3xl"
          src="/assets/Image.png"
          width={500}
          height={760}
          alt="image"
        />
      </div>
      <div
        className="rounded-r-3xl px-16"
        style={{ backgroundColor: "#FFD8B4", width: "25%" }}
      >
        <div
          className=" font-bold text-4xl text-center mb-10 mt-5 text-orange-600"
        >
          Studio Masak
        </div>
        <Form onFinish={onFinish}>
          <Form.Item name="nama">
            <Input placeholder="Nama kitchen studio" />
          </Form.Item>

          <Form.Item
            name="logo"
            rules={[{ required: true, message: "Silakan pilih Logo" }]}
          >
            <Upload
              {...uploadProps}
              fileList={logoFileList}
              onChange={uploadLogoKitchen}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Pilih Logo
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="whatsapp">
            <Input placeholder="No Whatsapp" />
          </Form.Item>

          <Form.Item
            name="legalitas"
            rules={[
              { required: true, message: "Silakan pilih file legalitas" },
            ]}
          >
            <Upload
              {...uploadProps}
              fileList={legalitasFileList}
              onChange={uploadLegalitas}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Pilih Legalitas
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="jumlahChef">
            <Input placeholder="jumlah chef" type="number"/>
          </Form.Item>

          <Form.Item name="alamat">
            <Input placeholder="Alamat" />
          </Form.Item>
          <Form.Item name="desc">
            <Input placeholder="Deskripsi" />
          </Form.Item>
          <Form.Item name="password">
            <Input.Password placeholder="Kata Sandi" />
          </Form.Item>

          <Form.Item name="confirm">
            <Input.Password placeholder="Konfirmasi Kata Sandi" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#FF7D04", borderColor: "#FF7D04" }}
            >
              Daftar
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Image
            style={{ bottom: "30px", right: "30px" }}
            className="absolute"
            src="/assets/maskot.png"
            width={150}
            height={150}
            alt="Cook Yuk Cook"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterKitchen;
