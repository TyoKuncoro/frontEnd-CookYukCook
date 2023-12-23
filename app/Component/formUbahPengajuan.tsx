import { kitchenRepository } from "#/repository/kitchen";
import { regularClassRepository } from "#/repository/regularClass";
import { temaKelasRepository } from "#/repository/tema";
import { Button, Form, Input, Select } from "antd";
import { parseJwt } from "./Helper/convert";
import { useEffect, useState } from "react";

const FormUbahPengajuan = ({idClass}) => {
    // const idClass = "6bd47f8a-a33f-4823-903c-f5d17637b916"
  const [form] = Form.useForm();
  type FieldType = {
    namaKelas?: string;
    tema?: string;
  };
  let id:any;
    const token = localStorage.getItem("access_token");
    if(token){
        id = parseJwt(token).id
    }
  const {data: dataTema} = temaKelasRepository.hooks.findTemaByUsers(id)
  const {data:dataReg} = regularClassRepository.hooks.findRegClassById(idClass)
  console.log(dataReg?.data.id, "Halo")
  const [updateReg, setUpdateReg] = useState({
    courseName: dataReg?.data?.courseName,
    theme_id: dataReg?.data?.theme_id,
  });
   //disini aku bikin useeffect buat nge set field nya
   useEffect(() => {
    form.setFieldsValue({
      courseName: dataReg?.data?.courseName,
      theme_id: dataReg?.data?.theme_id,
    });
    //[dataMateri] itu namanya array depedencies, jadi dia bakal manggil useEfect lagi, kalo yang di dalem dependecies nya berubah
    //disini kan tadinya dia sempet undefined, baru setelah ke berapa kali ada datanya, jadi dia terus kepanggil sampe ada datanya
  }, [dataReg]);
  const onFinish = async (values:any) => {
    console.log(values, "values")
    try{
        const data = {
            courseName:values.namaKelas,
            theme_id:values.tema
        }
        const update = await regularClassRepository.manipulateData.updatePengajuanKelasReg(idClass, data)
        console.log(update, "this")
    }catch(e){
        console.log(e)
    }
  }
  return (
    <div>
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
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <p className="text-base font-medium text-start">Nama Kelas</p>
          <Form.Item<FieldType>
            name="namaKelas"
            // className="font-bold text-2xl"
            rules={[{ required: true, message: "Harap masukan nama kelas" }]}
          >
            <Input
            onChange={(e) =>
                setUpdateReg({ ...updateReg, courseName: e.target.value })
                }
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
              value={dataReg?.data?.theme_id}
              style={{ width: 320 }}
              onChange={(e) =>
                setUpdateReg({ ...updateReg, theme_id: e })
                }
              // className="custom-placeholder"
            //   onChange={onChangeReg}
              options={dataTema?.data?.map((value: any) => {
                return {
                  value: value.id,
                  label: value.name,
                };
              })}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button key="submit" type="primary" htmlType="submit">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormUbahPengajuan;
