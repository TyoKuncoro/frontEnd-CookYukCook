"use client";

import { Form, Input, DatePicker, Select, Button, Upload, message } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";
import { UploadOutlined } from "@ant-design/icons";
import { authRepository } from "#/repository/auth";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { profile } from "console";
import { useRouter } from "next/navigation";
import { UploadProps } from "antd/lib";

const { Option } = Select;

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedGender, setSelectedGender] = useState(undefined);
  const [logoFileList, setLogoFileList] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
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
    console.log("Received values:", values);
    try {
      const data = {
        level: "Trainee",
        name: values?.name,
        email: values?.email,
        password: values?.password,
        phoneNumber: values?.whatsapp,
        dateOfBirth: values?.birthdate,
        gender: values?.gender,
        address: values?.alamat,
        photo: profilePhoto,
      };
      const register = await authRepository.manipulateData.register(data);
      setTimeout(message.success("Anda Berhasil Register"), 5000);
      console.log(register, "ini hasil register");
      router.push("/login");
    } catch (error) {
      // message.error(error.response.body.message)
    }
  };

  const onGenderChange = (value: any) => {
    setSelectedGender(value);
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Hanya dapat mengunggah file JPG/PNG!");
    }
    return isJpgOrPng;
  };

  const uploadProps = {
    maxCount: 1,
    beforeUpload: (file: any) => {
      // Validasi sebelum upload
      return false;
    },
  };

  const uploadPhoto = async (args: UploadChangeParam<UploadFile<any>>) => {
    const file = args.file;
    try {
      if(file.status === "done"){
        if (file.size && file.size > 2097152) {
          message.error("ukuran file terlalu besar");
        } else {
          if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
          ) {
            const response =
              await authRepository.manipulateData.uploadPhotoTrainee(file?.originFileObj);
            console.log(response.body.fileName, "ini hasilnya");
            setProfilePhoto(response.body.fileName);
            message.success("Foto berhasil terupload");
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
      <div
        className="rounded-l-3xl px-10 shadow-md h-[680px]"
        style={{ backgroundColor: "#FFD8B4", width: "35%" }}
      >
        <div className=" font-bold text-4xl text-center mb-10 mt-5 text-orange-600">
          Peserta
        </div>
        <div>
          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            // labelCol={{ span: 6 }}
            // wrapperCol={{ span: 32 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <div className="flex gap-8">
              <div className="w-96">
                <Form.Item
                  label="Nama"
                  name="name"
                  rules={[{ required: true, message: "Harap masukkan nama" }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-slate-500" />}
                    className="h-[35px]"
                    placeholder="Nama"
                  />
                </Form.Item>
                <Form.Item
                  label="No WhatsApp"
                  name="whatsapp"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukkan nomor Whatsapp",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-slate-500" />}
                    className="h-[35px]"
                    placeholder="No Whatsapp"
                  />
                </Form.Item>
                <Form.Item
                  label="Tanggal Lahir"
                  name="birthdate"
                  rules={[
                    { required: true, message: "Harap masukan tanggal lahir" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    className="h-[35px]"
                    placeholder="Tanggal Lahir"
                    prefix={<CalendarOutlined className="text-slate-500" />}
                  />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    { required: true, message: "Silakan pilih jenis kelamin" },
                  ]}
                >
                  <Select
                    placeholder="Pilih jenis kelamin"
                    className="h-[35px]"
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="Pria">Pria</Option>
                    <Option value="Wanita">Wanita</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="w-96">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Harap masukan email" },
                    { type: "email", message: "Alamat email tidak valid!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-slate-500" />}
                    className="h-[35px]"
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  label="Kata Sandi"
                  name="password"
                  rules={[
                    { required: true, message: "Harap masukan kata sandi" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    className="h-[35px]"
                    placeholder="Kata Sandi"
                  />
                </Form.Item>

                <Form.Item
                  label="Konfirmasi Kata Sandi"
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Harap konfirmasi kata sandi",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Konfirmasi password tidak cocok!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    className="h-[35px]"
                    placeholder="Konfirmasi Kata Sandi"
                  />
                </Form.Item>
                <Form.Item
                label="Profil"
                  name="profile"
                  // rules={[
                  //   { required: true, message: "Harap unggah foto Profile" },
                  // ]}
                >
                  <Upload
                    {...props}
                    maxCount={1}
                    // fileList={logoFileList}
                    onChange={uploadPhoto}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      // style={{ width: "100%" }}
                      className="h-[35px] w-72"
                    >
                      Unggah Foto Profil
                    </Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <Form.Item label="Alamat" name="alamat">
                  <Input placeholder="Alamat" className="h-[50px]" />
                </Form.Item>
            <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
              <Button
                type="primary"
                htmlType="submit"
                // style={{ backgroundColor: "#FF7D04", borderColor: "#FF7D04" }}
                className="w-28 float-right mt-3 hover:bg-white hover:text-button"
              >
                Daftar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div>
        <Image
          className="rounded-r-3xl"
          src="/assets/Jelly.png"
          width={500}
          height={680}
          alt="image"
        />
      </div>{" "}
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
  );
};

export default Register;
