import { materiRepository } from "#/repository/materi";
import { Button, Form, Input, Modal, message } from "antd";
const CreateMateriModal = ({ idClass, typeClass, visible, onClose }:any) => {
  const [form] = Form.useForm();

  const onFinish = async (values:any) => {
    try {
      const data = {
        idclass: idClass,
        typeClass: typeClass,
        name: values.name,
        link: values.link,
      };
      const createdMateri = await materiRepository.manipulateData.createMaterial(data);

      console.log('Materi created successfully:', createdMateri);
      message.success('Materi created successfully');
      onClose();
    } catch (error) {
      console.error('Error creating materi:', error);
      message.error('Failed to create materi');
    }
  };

  return (
    <Modal
      title="Tambah Materi"
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="text-center"
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input the materi name!' }]}
        >
          <Input placeholder="Materi Name" />
        </Form.Item>

        <Form.Item
          name="link"
          rules={[{ required: true, message: 'Please input the materi link!' }]}
        >
          <Input placeholder="Materi Link" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tambah 
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateMateriModal;