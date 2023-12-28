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
import { temaKelasRepository } from "#/repository/tema";
import { useEffect, useState } from "react";
import { kitchenRepository } from "#/repository/kitchen";

const FormPengajuanKelas = ({mutateData, onClose}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem("access_token");
  const [id, setId] = useState(null)
  useEffect(() =>{
    if (token) {
      setId (parseJwt(token).id)
      // console.log(id);
    }
    const {data: dataTema} = temaKelasRepository.hooks.findTemaByUsers(id)
    const {data: dataKitchen} = kitchenRepository.hooks.getKitchenById(id)
    
  }, [token])
  // let id:any;
  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const data = {
        theme_id: values?.tema,
        kitchen_id: dataKitchen.data.id,
        courseName: values?.namaKelas,
        startDate: values?.tglMulai,
        endDate: values?.tglSelesai,
        numberOfBenches: values?.bench,
        price: values?.harga,
        description: values?.desc,
        adminFee: values?.adminFee,
      };
      const pengajuan =
        await regularClassRepository.manipulateData.createKelasReg(data);
      console.log(pengajuan, "ini dia");
      setTimeout(()=>{
        onClose()
        message.success("Pengajuan Kelas Berhasil");
      }, 2000)
      form.resetFields()
      mutateData()
    } catch (error) {
      console.log(error);
    }
  };
  // const onFinish = (values: any) => {
  //     console.log("Success:", values);
  //   };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  type FieldType = {
    namaKelas?: string;
    tema?: string;
    tglMulai?: Date;
    tglSelesai: Date;
    bench: number;
    harga: number;
    adminFee: number;
    desc: string;
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChange1 = (value: number) => {
    console.log("changed", value);
    // form.setFieldValue('adminFee', value * 10 / 100)
  };
  const onChangeTema = (value :string[]) => {
    console.log(`selected ${value}`)

  }
  const handleAdminFee = (value: number) =>{
    form.setFieldValue('adminFee', value * 10 / 100)
  }
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      layout="vertical"
      // style={{ maxWidth: 600 }}
      className="flex flex-col justify-centers items-center"
      size="middle"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="flex flex-row gap-10">
        <div>
          <div>
            <p className="text-base font-medium text-start">Nama Kelas</p>
            <Form.Item<FieldType>
              name="namaKelas"
              // className="font-bold text-2xl"
              rules={[{ required: true, message: "Harap masukan nama kelas" }]}
            >
              <Input
                placeholder="Nama Kelas"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-base font-medium text-start">Tema Kelas</p>
            <Form.Item<FieldType>
              name="tema"
              rules={[{ required: true, message: "Harap masukan tema kelas" }]}
            >
              <Select 
                defaultValue="Pilih Tema"
                style={{ width: 320}}
                // className="custom-placeholder"
                onChange={onChangeTema}
                options={dataTema?.data?.map((value:any) =>{
                  return {
                    value:value.id,
                    label: value.name
                  }
                })
                }
              />
              {/* <Input
                placeholder="Tema Kelas"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              /> */}
            </Form.Item>
          </div>
          <div>
            <p className="text-base font-medium text-start">Tanggal Mulai</p>
            <Form.Item<FieldType>
              name="tglMulai"
              rules={[{ required: true, message: "Pilih tanggal mulai kelas" }]}
            >
              <DatePicker
                onChange={onChange}
                placeholder="Tanggal Mulai"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-base font-medium text-start">Tanggal Selesai</p>
            <Form.Item<FieldType>
              name="tglSelesai"
              className="flex "
              rules={[
                { required: true, message: "Pilih tanggal selesai kelas" },
              ]}
            >
              <DatePicker
                onChange={onChange}
                placeholder="Tanggal Selesai"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div>
            <p className="text-base font-medium text-start">Jumlah Peserta</p>
            <Form.Item<FieldType>
              name="bench"
              rules={[
                { required: true, message: "Harap masukan Jumlah peserta" },
              ]}
            >
              <InputNumber
                // defaultValue={0}
                onChange={onChange1}
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
                placeholder="Jumlah Peserta"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-base font-medium text-start">Harga</p>
            <Form.Item<FieldType>
              name="harga"
              rules={[{ required: true, message: "Harap masukan harga kelas" }]}
            >
              <InputNumber
                // defaultValue={0}
                onChange={handleAdminFee}
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
                placeholder="Harga"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-base font-medium text-start">Biaya Admin</p>
            <Form.Item<FieldType>
              name="adminFee"
              rules={[{ required: true, message: "" }]}
              // val={form.getFieldValue('harga')}
            >
              <Input
                disabled
                value={'pp'}
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
                // placeholder="Biaya Admin"
              />
            </Form.Item>
          </div>
          <div>
            <p className="text-base font-medium text-start">Deskripsi Kelas</p>
            <Form.Item<FieldType>
              name="desc"
              rules={
                [
                  // { required: true, message: "Please input your password!" },
                ]
              }
            >
              <Input
                placeholder="Deskripsi"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              />
            </Form.Item>
          </div>
        </div>
      </div>

      <Form.Item>
        <Button key="submit" type="primary" htmlType="submit">
          Ajukan Kelas
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormPengajuanKelas;
