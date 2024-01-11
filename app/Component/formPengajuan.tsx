import { regularClassRepository } from "#/repository/regularClass";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  message,
} from "antd";
import { Option } from "antd/es/mentions";
import { DatePickerProps } from "antd/lib";
import { parseJwt } from "./Helper/convert";
import { temaKelasRepository } from "#/repository/tema";
import { useEffect, useState } from "react";
import { kitchenRepository } from "#/repository/kitchen";
import { useRouter } from "next/navigation";
import { RangePickerProps } from "antd/es/date-picker";
import { usersPaymentRepository } from "#/repository/usersPayment";

const { RangePicker } = DatePicker;
const FormPengajuanKelas = ({ mutateData, onClose }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  let id: any;
  if (token) {
    id = parseJwt(token).id;
    console.log(id, "angjay");
  }
  const { data: dataTema } = temaKelasRepository.hooks.findTemaByUsers(id);
  // const {data: dataKitchen} = kitchenRepository.hooks.getKitchenById(id)
  const { data: dataKitchen } = kitchenRepository.hooks.getKitchenByUser();
  console.log(dataKitchen, "halooo cuy");
  // useEffect(() =>{
  //   if (token) {
  //     setId (parseJwt(token).id)
  //     // console.log(id);
  //   }

  // }, [token])
  // let id:any;
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
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
      setTimeout(() => {
        onClose();
        message.success("Pengajuan Kelas Berhasil");
      }, 2000);
      form.resetFields();
      const findUserPay = usersPaymentRepository.hooks.getUserPayByRegClass(pengajuan?.body?.data?.id)
      console.log(findUserPay, "findd")
      localStorage.setItem("idKelas", findUserPay.data);
      router.push("/pembayaran");
      mutateData();
    } catch (error) {
      console.log(error);
    }
  };
  //   // const onFinish = (values: any) => {
  //   //     console.log("Success:", values);
  //   //   };

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

  // const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const onChange1 = (value: number) => {
    console.log("changed", value);
    // form.setFieldValue('adminFee', value * 10 / 100)
  };
  const onChangeTema = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleAdminFee = (value: number) => {
    form.setFieldValue("adminFee", `${(value * 10)/ 100}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };
  const parsePrice = (value: number) => {
    return parseInt(value.replace(/[^0-9]/g, ""), 10);
  };
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };
  return (
    <Form
      form={form}
      name="basic"
      // labelCol={{ span: 4 }}
      // wrapperCol={{ span: 16 }}
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
          <Form.Item<FieldType>
            label="Nama Kelas"
            name="namaKelas"
            // className="font-bold text-2xl"
            rules={[{ required: true, message: "Harap masukan nama kelas" }]}
          >
            <Input
              placeholder="Nama Kelas"
              className="custom-placeholder h-9 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Tema Kelas"
            name="tema"
            rules={[{ required: true, message: "Harap masukan tema kelas" }]}
          >
            <Select
              defaultValue="Pilih Tema"
              // class='selecttema'
              style={{ width: 320, height: 36, lineHeight: 44 }}
              // className="selecttema"
              // className="border border-solid border-button rounded-lg"
              onChange={onChangeTema}
              options={dataTema?.data?.map((value: any) => {
                {
                  console.log(value.id, "ini id tema");
                }
                return {
                  value: value.id,
                  label: value.name,
                };
              })}
            />
            {/* <Input
                placeholder="Tema Kelas"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              /> */}
          </Form.Item>
          <Form.Item<FieldType>
            label="Tanggal Mulai"
            name="tglMulai"
            rules={[{ required: true, message: "Pilih tanggal mulai kelas" }]}
          >
            <DatePicker
              showTime
              onChange={onChange}
              placeholder="Tanggal Mulai"
              className="custom-placeholder h-9 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Tanggal Selesai"
            name="tglSelesai"
            className="flex "
            rules={[{ required: true, message: "Pilih tanggal selesai kelas" }]}
          >
            <DatePicker
              showTime
              onChange={onChange}
              placeholder="Tanggal Selesai"
              className="custom-placeholder h-9 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item<FieldType>
            label="Jumlah Peserta"
            name="bench"
            rules={[
              { required: true, message: "Harap masukan Jumlah peserta" },
            ]}
          >
            <InputNumber
              // defaultValue={0}
              onChange={onChange1}
              className="custom-placeholder h-9 w-80 rounded-lg border-orange-300"
              placeholder="Jumlah Peserta"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Harga"
            name="harga"
            rules={[{ required: true, message: "Harap masukan harga kelas" }]}
          >
            <InputNumber
              // defaultValue={0}
              onChange={handleAdminFee}
              className="custom-placeholder h-9 w-80 rounded-lg border-orange-300"
              placeholder="Harga"
              min={0}
              step={1}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={parsePrice}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Biaya Admin 10%"
            name="adminFee"
            rules={[{ required: true, message: "" }]}
            // val={form.getFieldValue('harga')}
          >
            <Input
              readOnly
              value={"pp"}
              className="custom-placeholder h-9 w-80 text-base rounded-lg border-orange-300"
              // placeholder="Biaya Admin"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Deskripsi Kelas"
            name="desc"
            rules={
              [
                // { required: true, message: "Please input your password!" },
              ]
            }
          >
            <Input
              placeholder="Deskripsi"
              className="custom-placeholder h-9 w-80 rounded-lg border-orange-300"
            />
          </Form.Item>
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
