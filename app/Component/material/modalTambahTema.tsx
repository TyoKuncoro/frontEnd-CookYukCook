import { temaKelasRepository } from "#/repository/tema";
import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useState } from "react";
import { parseJwt } from "../Helper/convert";
import { TeamOutlined } from "@ant-design/icons";

const TambahTema = (props: any) => {
  const { open, closeModal } = props;
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpenModal(true);
  };
  type FieldType = {
    name?: string;
    chef_name?: string;
    price?: Date;
  };

  const token = localStorage.getItem("access_token");
  let id: any;
  if (token) {
    id = parseJwt(token).id;
    // console.log(id);
  }

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const data = {
        kitchen: id,
        name: values?.name,
        chef_name: values?.chef_name,
        price: values?.price,
      };
      const createTema = await temaKelasRepository.manipulateData.createTema(
        data
      );
      console.log(createTema, "oke");
      message.success("Tema Kelas berhasil terbuat");
      setTimeout(() => {
        closeModal();
      }, 2000);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        className="text-center"
        title="Tambah Tema Kelas"
        visible={openModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          className="flex flex-col justify-centers items-center"
          size="middle"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <p className="text-base font-medium text-start">Tema Kelas</p>
            <Form.Item<FieldType>
              name="name"
              rules={[
                { required: true, message: "Harap masukan nama tema kelas" },
              ]}
            >
              <Input
                placeholder="Tema Kelas"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              />
            </Form.Item>
          </div>
          <div>
          <p className="text-base font-medium text-start">Nama Chef</p>
          <Form.Item<FieldType>
            name="chef_name"
            rules={[{ required: true, message: "Harap masukan nama chef" }]}
          >
            <Input
              prefix={<TeamOutlined className="text-2xl text-slate-500" />}
              placeholder="Nama Chef"
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
        </div>
        <div>
          <p className="text-base font-medium text-start">Harga</p>
          <Form.Item<FieldType>
            name="price"
            rules={[{ required: true, message: "Harap masukan harga" }]}
          >
            <InputNumber
              placeholder="Price"
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
        </div>
          <Form.Item>
            <Button key="submit" type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default TambahTema;
