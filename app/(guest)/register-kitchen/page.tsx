"use client";

import React, { useState } from "react";
import { Upload, Input, Button, Form, Select, message } from "antd";
import { EnvironmentOutlined, LockOutlined, MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { authRepository } from "#/repository/auth";
import { useRouter } from "next/navigation";
import { UploadChangeParam } from "antd/es/upload";
import { UploadFile, UploadProps } from "antd/lib";
const { Option } = Select;

const RegisterKitchen = () => {
  const router = useRouter();
  const [logoFileList, setLogoFileList] = useState([]);
  const [legalitasFileList, setLegalitasFileList] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [legalitas, setLegalitas] = useState<string | null>(null);
  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
      if (file.status === "done") {
        if (file.size && file.size > 2097152) {
          message.error("ukuran file terlalu besar");
        } else {
          if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
          ) {
            const response = await authRepository.manipulateData.uploadLogo(
              file?.originFileObj
            );
            console.log(response.body.fileName, "hasilnya");
            setProfilePhoto(response.body.fileName);
            message.success("Foto logo berhasil terupload");
          } else {
            message.error("Extensi file tidak diketahui");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadLegalitas = async (args: UploadChangeParam<UploadFile<any>>) => {
    const file = args.file;
    try {
      if (file.status === "done") {
        if (file.size && file.size > 2097152) {
          message.error("ukuran file terlalu besar");
        } else {
          if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
          ) {
            const response =
              await authRepository.manipulateData.uploadLegalitas(file?.originFileObj);
            console.log(response.body.fileName, "hasilnya");
            setLegalitas(response.body.fileName);
            message.success("Foto legalitas berhasil terupload");
          } else {
            message.error("Extensi file tidak diketahui");
          }
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
    <div className=" h-full flex m-auto items-center justify-center shadow-xl">
      <div>
        <Image
          className="rounded-l-3xl shadow-md"
          src="/assets/Image.png"
          width={500}
          height={680}
          alt="image"
        />
      </div>
      <div
        className="rounded-r-3xl px-10 shadow-md h-[680px]"
        style={{ backgroundColor: "#FFD8B4", width: "35%" }}
      >
        <div className=" font-bold text-4xl text-center mb-10 mt-5 text-orange-600">
          Studio Masak
        </div>
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <div className="flex gap-8">
            <div className="w-96 mt-0">
              <Form.Item
                label="Nama"
                name="nama"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan nama Studio Masak anda",
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="text-slate-500" />} className="h-[35px]" placeholder="Nama kitchen studio" />
              </Form.Item>
              <Form.Item
                label="No WhatsApp"
                name="whatsapp"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan nomor WhatsApp Studio Masak anda",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined className="text-slate-500" />} className="h-[35px]" placeholder="No Whatsapp" />
              </Form.Item>

              <Form.Item
                label="Jumlah Chef"
                name="jumlahChef"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan jumlah chef Studio Masak anda",
                  },
                ]}
              >
                <Input className="h-[35px]" placeholder="jumlah chef" type="number" />
              </Form.Item>
              <Form.Item
                label="Alamat"
                name="alamat"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan alamat Studio Masak anda",
                  },
                ]}
              >
                <Input prefix={<EnvironmentOutlined className="text-slate-500"/>} className="h-[35px]" placeholder="Alamat" />
              </Form.Item>
              <Form.Item label="Deskripsi" name="desc">
                <Input className="h-[35px]" placeholder="Deskripsi" />
              </Form.Item>
            </div>
            <div className="w-96 mt-0">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan email Studio Masak anda",
                  },
                ]}
              >
                <Input prefix={<MailOutlined className="text-slate-500" />} className="h-[35px]" placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Kata Sandi"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan kata sandi Studio Masak anda",
                  },
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-slate-500" />} className="h-[35px]" placeholder="Kata Sandi" />
              </Form.Item>

              <Form.Item
                label="Konfirmasi Kata Sandi"
                name="confirm"
                rules={[
                  {
                    required: true,
                    message:
                      "Harap konfirmasi kata sandi",
                  },
                ]}
              >
                <Input.Password
                prefix={<LockOutlined className="text-slate-500"/>}
                  className="h-[34px]"
                  placeholder="Konfirmasi Kata Sandi"
                />
              </Form.Item>
              <Form.Item
                label="Logo"
                name="logo"
                rules={[{ required: true, message: "Silakan pilih Logo" }]}
              >
                <Upload
                  {...props}
                  // fileList={logoFileList}
                  maxCount={1}
                  onChange={uploadLogoKitchen}
                  // beforeUpload={}
                >
                  <Button icon={<UploadOutlined />} className=" h-[35px] w-72">
                    Unggah Logo
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Legalitas"
                name="legalitas"
                rules={[
                  { required: true, message: "Silakan pilih file legalitas" },
                ]}
              >
                <Upload
                  {...props}
                  // fileList={legalitasFileList}
                  maxCount={1}
                  onChange={uploadLegalitas}
                >
                  <Button icon={<UploadOutlined />} className="h-[35px] w-72">
                    Unggah Legalitas
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-28 float-right mr-4 mt-3 hover:bg-white hover:text-button"
              // style={{ backgroundColor: "#FF7D04", borderColor: "#FF7D04" }}
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
    // <div>
      
    // </div>
  );
};

export default RegisterKitchen;
