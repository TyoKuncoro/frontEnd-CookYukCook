import { usersRepository } from "#/repository/user";
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

function RejectKitchen({idUsers, onClose, mutate}:any) {
    const idUser = idUsers
    console.log(idUser, "ID USERS")
    const [form] = useForm();
    const { TextArea } = Input;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('Change:', e.target.value);
    };

     const onFinish = async (values:any) => {
        const status = 'inactive';
        try{
            const data = {
                alasan: values?.alasan,
                status: status

            }
            const reject = await usersRepository.manipulatedData.rejectKitchen(idUser, data);
            console.log(reject, "oke")
            mutate()
            message.success("Alasan menolak berhasil terkirim")
            onClose()
        }catch(e){
            message.error("Gagal Menolak Studio Masak");
        }
     }
    return (
        <div>
            <Form
                form={form}
                className="flex flex-col justify-centers items-center"
                size="middle"
                onFinish={onFinish}>
                    <p>{idUser}</p>
                    <p className="text-base font-medium text-start">Alasan Menolak Studio Masak</p>
                    <Form.Item name={'alasan'}>
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={onChange}
                        placeholder="Masukan alasan menolak"
                        style={{ height: 120, resize: 'none' }}
                    />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Kirim
                        </Button>
                    </Form.Item>
            </Form>
        </div>
    )
}
export default RejectKitchen;