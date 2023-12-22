// TambahMateri.jsx
import { materiRepository } from "#/repository/materi";
import { LinkOutlined } from "@ant-design/icons";
import { Form, Input, Select, Modal, Button, message } from "antd";

const TambahMateri = ({ idClass, typeClass, onClose , mutateData}: any) => {
  const [form] =Form.useForm()
  const onFinish = async (values: any) => {
    // Kirim data materi ke backend
    console.log("Form values:", values);
    const data = {
      type_class: typeClass,
      idclass: idClass,
      name: values?.namaMateri,
      link: values?.link,
    };
    const insert = await materiRepository.manipulateData.createMaterial(data);
    console.log(insert, "halo");
    // Tutup modal setelah selesai
    message.success("Materi Berhasil ditambahkan")
    setTimeout(() => {
      onClose();
    }, 2000);
    mutateData()
    form.resetFields();
  };

  return (
    <div>
      <Form
      form={form}
      className="flex flex-col justify-centers items-center"
      size="middle" 
      onFinish={onFinish}>
        <div>
          <p className="text-base font-medium text-start">Materi</p>
          <Form.Item
            name="namaMateri"
            rules={[{ required: true, message: "Nama Materi harus diisi" }]}
          >
            <Input
            placeholder="Materi Kelas" 
            className="custom-placeholder h-11 w-80 rounded-lg border-orange-300" />
          </Form.Item>
        </div>
        <div>
          <p className="text-base font-medium text-start">Tautan Video</p>
          <Form.Item
            name="link"
            rules={[{ required: true, message: "Link Materi harus diisi" }]}
          >
            <Input
            placeholder="Tautan Video"
            prefix={<LinkOutlined className="text-2xl text-slate-500"/>} 
            className="custom-placeholder h-11 w-80 rounded-lg border-orange-300" />
          </Form.Item>
        </div>

        <Form.Item
          name="type"
          label="Jenis Kelas"
          initialValue={typeClass}
          hidden
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tambah
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TambahMateri;
