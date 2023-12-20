import { regularClassRepository } from "#/repository/regularClass";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { Option } from "antd/es/mentions";
import { DatePickerProps } from "antd/lib";
import { parseJwt } from "./Helper/convert";
import { TeamOutlined } from "@ant-design/icons";
import { temaKelasRepository } from "#/repository/tema";

const FormTambahTema = () => {
  const token = localStorage.getItem("access_token");
  let id:any;
  if (token) {
    id = parseJwt(token).id;
    // console.log(id);
  }
  const onFinish = async (values:any) =>{
    try{
        const data ={
            kitchen:id,
            name:values?.name,
            chef_name:values?.chef_name,
            price:values?.price
        }
        const createTema = await temaKelasRepository.manipulateData.createTema(data)
        console.log(createTema, "oke")
        message.success("oke")
    }catch(e){
        console.log(e)
    }
  }
  // const onFinish = (values: any) => {
  //     console.log("Success:", values);
  //   };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    name?: string;
    chef_name?: string;
    price?: Date;
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChange1 = (value: number) => {
    console.log("changed", value);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        className="flex flex-col justify-centers items-center"
        size="middle"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="name"
          rules={[{ required: true, message: "Harap masukan nama tema kelas" }]}
        >
          <Input
            placeholder="Tema Kelas"
            className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
          />
        </Form.Item>

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
        <Form.Item<FieldType>
          name="price"
          rules={[{ required: true, message: "Harap masukan nama chef" }]}
        >
          <InputNumber
            placeholder="Price"
            className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
          />
        </Form.Item>
        <Form.Item>
          <Button key="submit" type="primary" htmlType="submit">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormTambahTema;
