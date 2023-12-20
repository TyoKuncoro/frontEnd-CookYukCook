import { LinkOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd"

const FormUbahMateri = () =>{
    const onFinish = (values: any) => {
        console.log("Success:", values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
      };
    type FieldType = {
        namaMateri?: string;
        link?: string;
      };
    return(
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
              name="namaMateri"
              rules={[
                { required: true, message: "Harap masukan nama materi" },
              ]}
            >
              <Input 
              placeholder="Materi Kelas" 
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300" />
            </Form.Item>

            <Form.Item<FieldType>
              name="link"
              rules={[
                { required: true, message: "Harap masukan link video materi" },
              ]}
            >
              <Input 
              prefix={<LinkOutlined className="text-2xl text-slate-500" />}
              placeholder="Link Video" 
              className="custom-placeholder h-11 w-80 rounded-lg border-orange-300" />
              </Form.Item>
          <Form.Item>
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Simpan
          </Button>
          </Form.Item>
        </Form>
    </div>
    )
}
export default FormUbahMateri;