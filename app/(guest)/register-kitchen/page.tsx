"use client";

import React, { useState } from "react";
import { Upload, Input, Button, Form, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
      setTimeout(message.success("Anda Berhasil Register"), 2000);
      console.log(register, "ini hasil register");
      router.push("/home");
    } catch (error) {
      // message.error(error.response.body.message)
    }
  };

  // const uploadProps = {
  //   maxCount: 1,
  //   beforeUpload: (file: any) => {
  //     // Validasi sebelum upload
  //     return false;
  //   },
  // };

  // const logoUploadProps = {
  //   accept: ".png,.jpg,.jpeg",
  //   beforeUpload: (file: any) => {
  //     setLogoFileList(file.slice(-1));
  //     return false; // Prevent default upload behavior
  //   },
  // };

  // const legalitasUploadProps = {
  //   accept: ".pdf",
  //   beforeUpload: (file: any) => {
  //     setLegalitasFileList(file);
  //     return false; // Prevent default upload behavior
  //   },
  // };
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
          const response = await authRepository.manipulateData.uploadLogo(
            file?.originFileObj
          );
          console.log(response.body.fileName, "hasilnya");
          setProfilePhoto(response.body.fileName);
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
      if (file.size && file.size > 2 * 1024 * 1024) {
        message.error("ukuran file terlalu besar");
      } else {
        if (
          file.type === "image/png" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        ) {
          const response = await authRepository.manipulateData.uploadLegalitas(
            file?.originFileObj
          );
          console.log(response.body.fileName, "hasilnya");
          setLegalitas(response.body.fileName);
        } else {
          message.error("Extensi file tidak diketahui");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <div
        className="flex rounded-3xl m-auto items-center justify-center mt-1"
        style={{ backgroundColor: "#FFD8B4" }}
      >
        {/* <div>
        <Image
          className="rounded-l-3xl text-start"
          src="/assets/Image.png"
          width={550}
          height={910}
          alt="image"
        />
      </div> */}
        <div className="px-8">
          <div
            className=" font-bold text-4xl text-center mb-8 mt-5"
            style={{ color: "white" }}
          >
            Studio Masak
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <div className="flex gap-24">
              <div>
                <Form.Item
                  label="Nama"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukan nama Studio Masak anda",
                    },
                  ]}
                  name="nama"
                >
                  <Input className="w-80" placeholder="Nama Studio Masak" />
                </Form.Item>
                <Form.Item
                  label="No WhatsApp"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukan No WhatsApp Studio Masak anda",
                    },
                  ]}
                  name="whatsapp"
                >
                  <Input className="w-80" placeholder="No Whatsapp" />
                </Form.Item>
                <Form.Item
                  label="Jumlah Chef"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukan jumlah chef Studio Masak anda",
                    },
                  ]}
                  name="jumlahChef"
                >
                  <Select className="w-80" placeholder="Jumlah Chef">
                    {[...Array(10)].map((_, index) => (
                      <Option key={index + 1} value={index + 1}>
                        {index + 1}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Deskripsi Studio Masak" name="desc">
                  <Input className="w-80" placeholder="Deskripsi" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukan email Studio Masak anda",
                    },
                  ]}
                  name="email"
                >
                  <Input className="w-80" placeholder="Email Studio Masak" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukan password Studio Masak anda",
                    },
                  ]}
                  name="password"
                >
                  <Input.Password className="w-80" placeholder="Password" />
                </Form.Item>

                <Form.Item
                  label="Konfirmasi Password"
                  rules={[
                    {
                      required: true,
                      message:
                        "Harap lakukan konfirmasi password Studio Masak anda",
                    },
                  ]}
                  name="confirm"
                >
                  <Input.Password className="w-80" placeholder="Konfirmasi Password" />
                </Form.Item>
                <div className="flex gap-4 w-20">
              <Form.Item
                label="Logo"
                name="logo"
                rules={[
                  {
                    required: true,
                    message: "Harap unggah Logo Studio Masak anda",
                  },
                ]}
              >
                <Upload
                  {...props}
                  // fileList={logoFileList}
                  onChange={uploadLogoKitchen}
                >
                  <Button className="w-36" icon={<UploadOutlined />}>
                    Unggah Logo
                  </Button>
                </Upload>
                {/* <Upload
      {...uploadProps}
      fileList={logoFileList}
      onChange={uploadLogoKitchen}
    >
      <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
        Pilih Logo
      </Button>
    </Upload> */}
              </Form.Item>

              <Form.Item
                label="Legalitas"
                name="legalitas"
                rules={[
                  {
                    required: true,
                    message: "Harap unggah legalitas Studio Masak anda",
                  },
                ]}
              >
                <Upload
                  {...props}
                  // fileList={legalitasFileList}
                  onChange={uploadLegalitas}
                >
                  <Button icon={<UploadOutlined />}>Unggah Legalitas</Button>
                </Upload>
                {/* <Upload
      {...uploadProps}
      fileList={legalitasFileList}
      onChange={uploadLegalitas}
    >
      <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
        Pilih Legalitas
      </Button>
    </Upload> */}
              </Form.Item>
            </div>
              </div>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#FF7D04", borderColor: "#FF7D04"}}
                className="float-right"
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
    </div>
  );
};

export default RegisterKitchen;
