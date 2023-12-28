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

const { Option } = Select;

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedGender, setSelectedGender] = useState(undefined);
  const [logoFileList, setLogoFileList] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    console.log("Received values:", values);
    try {
      const data = {
        level: "Trainee",
        name: values?.name,
        email: values?.email,
        password: values?.password,
        phoneNumber: values?.whatsapp,
        dateOfBirth: values?.birhtdate,
        gender: values?.gender,
        address: values?.alamat,
        photo: profilePhoto,
      };
      const register = await authRepository.manipulateData.register(data);
      setTimeout(message.success("Anda Berhasil Register"), 2000)
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
      if (file.size && file.size > 2097152) {
        message.error("ukuran file terlalu besar");
      } else {
        if(file.type === 'image/png' || file.type === 'image/jpg' ||file.type === 'image/jpeg'){
          const response = await authRepository.manipulateData.uploadPhotoTrainee(
            file
          );
          console.log(response.body.fileName, "ini hasilnya");
          setProfilePhoto(response.body.fileName);
          message.success('Foto berhasil terupload')
    }else{
      message.error("Extensi file tidak diketahui")
    }
      
      }
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem('access_token')
  if (token) {
    router.push('/home');
  }

  return (
    <div className="my-20">
      <div className="flex place-content-center">
        <div
          className="rounded-l-3xl"
          style={{ backgroundColor: "#FFD8B4", width: "30%" }}
        >
          <div
            className=" font-bold text-4xl text-center mb-20 mt-5 text-orange-600"
          >
            Peserta
          </div>
          <div className="mx-28">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 32 }}
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Silakan masukkan nama!" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nama" />
              </Form.Item>

              <Form.Item
                name="whatsapp"
                rules={[
                  {
                    required: true,
                    message: "Silakan masukkan nomor Whatsapp!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="No Whatsapp" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Silakan masukkan alamat email!" },
                  { type: "email", message: "Alamat email tidak valid!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="birthdate"
                rules={[
                  { required: true, message: "Silakan pilih tanggal lahir!" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Tanggal Lahir"
                  prefix={<CalendarOutlined />}
                />
              </Form.Item>

              <Form.Item
                name="gender"
                rules={[
                  { required: true, message: "Silakan pilih jenis kelamin!" },
                ]}
              >
                <Select
                  placeholder="Pilih jenis kelamin"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="Pria">Pria</Option>
                  <Option value="Wanita">Wanita</Option>
                </Select>
              </Form.Item>

              <Form.Item name="alamat">
                <Input placeholder="Alamat" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Silakan masukkan password!" },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Kata Sandi"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Silakan isi konfirmasi password!",
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
                  placeholder="Konfirmasi Kata Sandi"
                />
              </Form.Item>

              <Form.Item
                name="profile"
                rules={[{ required: true, message: "Silakan pilih Foto Profile" }]}
              >
                <Upload
                  {...uploadProps}
                  fileList={logoFileList}
                  onChange={uploadPhoto}
                >
                  <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                    Foto profil
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 9, span: 12 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#FF7D04", borderColor: "#FF7D04" }}
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
            width={510}
            height={760}
            alt="image"
          />
        </div>{" "}
      </div>
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
