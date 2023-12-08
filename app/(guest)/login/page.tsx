"use client";

import React from "react";
import Image from "next/image";
import { Button, Card, Input, Form } from "antd";
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


interface ErrorLogin {
  response : {
      body: {
          statusCode: number
          error: string
      }
  }
}
interface SuccessLogin {
  body: {
      data: {
          access_token: string
      }
      statusCode: number
      message: string
  }
}


const Login = () => {
  // const { data, error, isLoading } = sampleRepository.hooks.useJoke();
  const router = useRouter()
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    try {
       const data = {
            email: values?.email,
            password: values?.password
        }

       const login = await authRepository.manipulateData.login(data) 
       console.log(login, "Hasil API Login")
        localStorage.setItem("access_token", login?.body?.data?.access_token)
        router.push("/home")
    } catch (error) {
        // message.error(error.response.body.error)
        console.log(error, "errornya cook")
    }
};

  return (
    <div className="mt-20">
      <div className="flex place-content-center">
        <div
          className="rounded-l-3xl"
          style={{ backgroundColor: "#FFD8B4", width: "37%" }}
        >
          <div
            className=" font-bold text-7xl text-center mb-32 mt-5"
            style={{ color: "white" }}
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
                placeholder="Password"
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
            <div style={{ color: "#FC9F48" }}>belum punya akun?</div>
            <div style={{ color: "#FC9F48" }}>
              yuk buat{" "}
              <a href= "/select-role" className="text-blue underline underline-offset-2">
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
            height={590}
            alt="image"
          />
        </div>
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

export default Login;
