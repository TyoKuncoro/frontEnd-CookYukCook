"use client";

import React, { useState } from "react";
import { Upload, Input, Button, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
const { Option } = Select;


const RegisterKitchen = () => {
  const [logoFileList, setLogoFileList] = useState([]);
  const [legalitasFileList, setLegalitasFileList] = useState([]);

  const onFinish = (values: any) => {
    // Lakukan sesuatu dengan nilai-nilai formulir yang di-submit
    // Lakukan validasi di sini
    console.log("ini values cook", values);
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
          className=" font-bold text-4xl text-center mb-10 mt-5"
          style={{ color: "white" }}
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
              onChange={({ fileList }: any) => setLogoFileList(fileList)}
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
              onChange={({ fileList }: any) => setLegalitasFileList(fileList)}
            >
              <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                Pilih Legalitas
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="jumlahChef">
            <Select placeholder="Jumlah Chef">
              {[...Array(10)].map((_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="alamat">
            <Input placeholder="Alamat" />
          </Form.Item>

          <Form.Item name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="confirm">
            <Input.Password placeholder="Konfirmasi Password" />
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
