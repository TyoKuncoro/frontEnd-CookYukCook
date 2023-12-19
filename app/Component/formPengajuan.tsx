import { Button, DatePicker, Form, Input, InputNumber } from "antd"
import { DatePickerProps } from "antd/lib";

const FormPengajuanKelas = () => {
    const onFinish = (values: any) => {
        console.log("Success:", values);
      };
    
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
      };
    return(
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
          <div
          className="flex gap-10 justify-between"
          >
          <div>
            <Form.Item<FieldType>
              name="namaKelas"
              rules={[
                { required: true, message: "Harap masukan nama kelas" },
              ]}
            >
              <Input 
              placeholder="Nama Kelas" 
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300" />
            </Form.Item>

            <Form.Item<FieldType>
              name="tema"
              rules={[
                { required: true, message: "Harap masukan tema kelas" },
              ]}
            >
              <Input placeholder="Tema Kelas" className="custom-placeholder h-11 w-80 rounded-lg border-orange-300" />
            </Form.Item>

            <Form.Item<FieldType>
              name="tglMulai"
              rules={[
                { required: true, message: "Pilih tanggal mulai kelas" },
              ]}
            >
              <DatePicker
                onChange={onChange}
                placeholder="Tanggal Mulai"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="tglSelesai"
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
          <div>
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
            <Form.Item<FieldType>
              name="harga"
              rules={[
                { required: true, message: "Harap masukan harga kelas" },
              ]}
            >
              <InputNumber
                // defaultValue={0}
                onChange={onChange1}
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
                placeholder="Harga"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="adminFee"
              rules={[
                { required: true, message: "" },
              ]}
            >
              <InputNumber
                // defaultValue={0}
                onChange={onChange1}
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
                placeholder="Biaya Admin"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="desc"
              rules={[
                // { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                placeholder="Deskripsi"
                className="custom-placeholder h-11 w-80 rounded-lg border-orange-300"
                
              />
            </Form.Item>
          </div>
          </div>
          <Form.Item>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Ajukan Kelas
          </Button>
          </Form.Item>
        </Form>
    )
}
export default FormPengajuanKelas