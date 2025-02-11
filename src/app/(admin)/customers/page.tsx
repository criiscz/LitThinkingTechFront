'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createClient, getClients} from "@/api/ClientAPI";
import useAuthUser from "@/app/hooks/useAuthUser";

export default function CustomersPage() {
  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'id',
      key: 'customerID',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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

  const [pagination, setPagination] = useState({current: 1, pageSize: 10})
  const user = useAuthUser();

  const {data, refetch} = useQuery({
    queryKey: ['customers', pagination.current, pagination.pageSize],
    queryFn: () => getClients(user && user.accessToken),
  });

  const {mutateAsync: createNewClient} = useMutation({
    mutationKey: ['createClient'],
    mutationFn: (client) => createClient(user && user.accessToken, client),
  });

  const [openModal, setOpenModal] = useState(false);

  const handleFinish = async (values: any) => {
    createNewClient(values).then((r) => {
      if (r.error) {
        notification.error({
          message: 'Error',
          description: r.error,
        });
        return;
      }
      notification.success({
        message: 'Success',
        description: 'Client created successfully',
      });
      refetch();
      setOpenModal(false);

    }).catch(() => {
      notification.error({
        message: 'Error',
        description: 'Error creating client',
      });
    });
  }

  const form: React.ReactNode = (
    <Form onFinish={handleFinish}>
      <Form.Item
        label="Id"
        name="id"
        rules={[{required: true, message: 'Please input your Id !'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{required: true, message: 'Please input your name!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{required: true, message: 'Please input your phone!'}]}
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
    <GeneralView buttonAddLabel={'Add Client'}
                 tableColumns={columns}
                 tableData={data && data}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 pagination={pagination}
                 setPagination={setPagination}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
  )
}
