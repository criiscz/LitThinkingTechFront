'use client'
import {Button, Form, Input, notification} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getClients} from "@/api/ClientAPI";
import GeneralView from "@/app/(admin)/components/GeneralView";
import {createCategory, getCategories} from "@/api/CategoryAPI";
import useAuthUser from "@/app/hooks/useAuthUser";

export default function CategoriesPage() {
  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'id',
      key: 'customerID',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Button icon={<EditFilled/>} type="primary" onClick={() => setOpenModal(true)}>Edit</Button>
          <Button icon={<DeleteFilled/>} type="primary" danger>Delete</Button>
        </>
      )
    },
  ];

  const user = useAuthUser();

  const {data, refetch} = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(user && user.accessToken),
  });

  const {mutateAsync: createNewCategory} = useMutation({
    mutationKey: ['createCategory'],
    mutationFn: (category) => createCategory(user && user.accessToken, category),
  });

  const [openModal, setOpenModal] = useState(false);
  const [formInstance] = Form.useForm();

  const handleSubmit = async (values: any) => {
    createNewCategory(values).then((r) => {
      if (r.error) {
        notification.error({
          message: 'Error',
          description: r.error,
        });
        return;
      }
      notification.success({
        message: 'Success',
        description: 'Category created successfully',
      });
      refetch();
      setOpenModal(false);
      formInstance.resetFields();
    })
  }

  const form: React.ReactNode = (
    <Form onFinish={handleSubmit} form={formInstance}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{required: true, message: 'Please input your name!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )


  return (
    <GeneralView buttonAddLabel={'Add Category'}
                 tableColumns={columns}
                 tableData={data && data.categories}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
  )
}
