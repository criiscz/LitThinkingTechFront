'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {createCognitoUser, deleteUser, getUsers} from "@/app/services/cognitoActions";
import {useQuery} from "@tanstack/react-query";
import useAuthUser from "@/app/hooks/useAuthUser";


export default function UsersPage() {
  const user = useAuthUser();
  const columns = [
    {
      title: 'User ID',
      key: 'userID',
      render: (text: any, record: any) => (
        <>
          {record.Username}
        </>
      )
    },
    {
      title: 'Name',
      key: 'name',
      render: (text: any, record: any) => (
        <>
          {record.Attributes.find((a: any) => a.Name === 'name')?.Value}
        </>
      )
    },
    {
      title: 'Email',
      key: 'email',
      render: (text: any, record: any) => (
        <>
          {record.Attributes.find((a: any) => a.Name === 'email')?.Value}
        </>
      )
    },
    {
      title: 'Role',
      key: 'role',
      render: (text: any, record: any) => (
        <>
          {record.Attributes.find((a: any) => a.Name === 'custom:role')?.Value}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          {
            (user && user.username !== record.Username) &&
            <Button icon={<DeleteFilled/>} type="primary" danger onClick={() => handleDeleteUser(record)}>Delete</Button>
          }</>
      )
    },
  ];

  const handleDeleteUser = (record: any) => {
    console.log('delete', record)
    deleteUser(record.Username).then(r => refetch())
  }

  const createUser = (fields: any) => {
    createCognitoUser(fields.email, fields.name, fields.role).then(r => console.log(r)).then(r => refetch())

  }

  const {data: users, refetch} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  useEffect(() => {
    console.log(users)
  }, [users]);

  const [formInstance] = Form.useForm();


  const onFinish = (fields: any) => {
    console.log('Received values:', fields);
    createUser(fields)
  }

  const [openModal, setOpenModal] = useState(false);
  const form: React.ReactNode = (
    <Form onFinish={onFinish} form={formInstance}>
      <Form.Item label="Name" name={"name"}>
        <Input/>
      </Form.Item>
      <Form.Item label="Email" name={"email"}>
        <Input/>
      </Form.Item>
      <Form.Item label="Role" name={"role"}>
        <Select>
          <Select.Option value="ADMIN">Admin</Select.Option>
          <Select.Option value="EXTERNAL">External</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )


  return (
    <GeneralView buttonAddLabel={'Add User'}
                 tableColumns={columns}
                 tableData={users && users.Users as any}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
  )
}
