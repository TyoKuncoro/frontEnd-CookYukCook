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

const { Option } = Select;

const Page = () => {
  const [form] = Form.useForm();
  const [selectedGender, setSelectedGender] = useState(undefined);

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const onGenderChange = (value) => {
    setSelectedGender(value);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Hanya dapat mengunggah file JPG/PNG!");
    }
    return isJpgOrPng;
  };

  const uploadPhotoProps = {
    beforeUpload,
    onChange: (info) => {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
  };

  return (
    <div>
      <div className="flex place-content-center">
        <div
          className="rounded-l-3xl"
          style={{ backgroundColor: "#FFD8B4", width: "31%" }}
        >
          <div
            className=" font-bold text-7xl text-center mb-10 mt-5"
            style={{ color: "white" }}
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
                  <Option value="male">Pria</Option>
                  <Option value="female">Wanita</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="passwordRegister"
                rules={[
                  { required: true, message: "Silakan masukkan password!" },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Silakan isi konfirmasi password!" },
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
                  placeholder="Konfirmasi Password"
                />
              </Form.Item>

              <Form.Item
                name="photo"
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
              >
                <Upload.Dragger {...uploadPhotoProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Klik atau seret file untuk mengunggah
                  </p>
                </Upload.Dragger>
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
            width={550}
            height={800}
            alt="image"
          />
        </div>{" "}
      </div>
      <div>
        <Image 
        style={{bottom: '30px', right: '30px'}}
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

export default Page;
