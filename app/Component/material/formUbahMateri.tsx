import { materiRepository } from "#/repository/materi";
import { LinkOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";

const FormUbahMateri = ({ idMateri }: any) => {
  // console.log(idClass, "haiiii");
  const [form] = Form.useForm();
  const { data: dataMateri } =
    materiRepository.hooks.findMaterialById(idMateri);
  const [updateMateri, setUpdateMateri] = useState({
    namaMateri: dataMateri?.data?.name,
    link: dataMateri?.data?.link,
  });

  //disini aku bikin useeffect buat nge set field nya
  useEffect(() => {
    form.setFieldsValue({
      namaMateri: dataMateri?.data?.name,
      link: dataMateri?.data?.link,
    });
    //[dataMateri] itu namanya array depedencies, jadi dia bakal manggil useEfect lagi, kalo yang di dalem dependecies nya berubah
    //disini kan tadinya dia sempet undefined, baru setelah ke berapa kali ada datanya, jadi dia terus kepanggil sampe ada datanya
  }, [dataMateri]);

  console.log(dataMateri, "halo");
  const onFinish = (values: any) => {
    console.log(values, "halloooo");
    console.log("Success:", values);
    try {
      const data = {
        name: values.namaMateri,
        link: values.link,
      };
      const updateMateri =
        materiRepository.manipulateData.updateMaterialByClass(
          dataMateri.data.id,
          data
        );
      console.log(updateMateri, "hasil");
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    namaMateri?: string;
    link?: string;
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        className="flex flex-col justify-centers items-center"
        size="middle"
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <p>Materi</p>
          <Form.Item<FieldType>
            name="namaMateri"
            rules={[
              {
                required: true,
                message: "Harap masukan nama materi",
              },
            ]}
            initialValue={dataMateri?.data?.name}
          >
            <Input
              // value={dataMateri?.data?.name}
              // value={dataMateri?.data?.name}
              onChange={(e) =>
                setUpdateMateri({ ...updateMateri, namaMateri: e.target.value })
              }
              placeholder="Materi Kelas"
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
        </div>
        <div>
          <p>Tautan Video</p>
          <Form.Item<FieldType>
            name="link"
            rules={[
              {
                required: true,
                message: "Harap masukan link video materi",
              },
            ]}
          >
            <Input
              // value={handleLink(dataMateri?.data?.link)}
              prefix={<LinkOutlined className="text-2xl text-slate-500" />}
              onChange={(e) =>
                setUpdateMateri({ ...updateMateri, link: e.target.value })
              }
              placeholder="Link Video"
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
        </div>
        {/* <Form.Item
          name="idclass"
          label="Jenis Kelas"
          initialValue={idClass}
          hidden
        >
          <Input />
        </Form.Item> */}
        <Form.Item>
          <Button key="submit" type="primary" htmlType="submit">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormUbahMateri;
