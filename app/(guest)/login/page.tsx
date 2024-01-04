"use client";

import React from "react";
import Image from "next/image";
import { Button, Card, Input, Form, message } from "antd";
import { store } from "#/store";
import { sampleRepository } from "#/repository/sample";
import FullRoundButton from "../../Component/fullRoundedButton";
import { authRepository } from "#/repository/auth";
import { useRouter } from "next/navigation";
import {
  DownloadOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { parseJwt } from "#/app/Component/Helper/convert";

interface ErrorLogin {
  response: {
    body: {
      statusCode: number;
      error: string;
    };
  };
}
interface SuccessLogin {
  body: {
    data: {
      access_token: string;
    };
    statusCode: number;
    message: string;
  };
}

const Login = () => {
  // const { data, error, isLoading } = sampleRepository.hooks.useJoke();
  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      const data = {
        email: values?.email,
        password: values?.password,
      };

      const masuk = await authRepository.manipulateData.login(data);
      console.log(masuk, "Hasil API Login");
      localStorage.setItem("access_token", masuk?.body?.data?.access_token);
      setTimeout(message.success(`Halo! Selamat Datang`), 2000)
      const cariToken = localStorage.getItem("access_token");
      const role = parseJwt(cariToken).role
      console.log(role, "halo");
      if(role === "Admin"){
        router.push("/home-admin")
      }else{
        router.push("home");
      }
    } catch (error) {
      // message.error(error.response.body?.error)
      console.log(error, "errornya cook");
    }
  };



  const token = localStorage.getItem('access_token')
  if (token) {
    router.push('/home');
  }

  return (
    <div className="mt-20">
      <div className="flex place-content-center">
        <div
          className="rounded-l-3xl"
          style={{ backgroundColor: "#FFD8B4", width: "35%" }}
        >
          <div
            className=" font-bold text-7xl text-center mb-32 mt-5 text-orange-600"
          >
            Login
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ maxWidth: "300px", margin: "0 auto" }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Kata Sandi"
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#FF7D04",
                  color: "white",
                }}
              >
                Masuk
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-32 mb-16">
            <div className="text-orange-500">belum punya akun?</div>
            <div className="text-orange-500">
              yuk buat{" "}
              <a
                href="/select-role"
                className="text-blue underline underline-offset-2"
              >
                disini
              </a>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="rounded-r-3xl"
            src="/assets/Image.png"
            width={500}
            height={600}
            alt="image"
          />
        </div>
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

export default Login;
