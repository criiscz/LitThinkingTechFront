'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useEffect, useState} from "react";
import {Button, Form, Input, Select} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {createCognitoUser, deleteUser, getUsers} from "@/app/services/cognitoActions";
import {useQuery} from "@tanstack/react-query";
import useAuthUser from "@/app/hooks/useAuthUser";
import {useTranslations} from "next-intl";


export default function UsersPage() {
  const user = useAuthUser();
  const t = useTranslations();
  const columns = [
    {
      title: t('userId'),
      key: 'userID',
      render: (text: any, record: any) => (
        <>
          {record.Username}
        </>
      )
    },
    {
      title: t('name'),
      key: 'name',
      render: (text: any, record: any) => (
        <>
          {record.Attributes.find((a: any) => a.Name === 'name')?.Value}
        </>
      )
    },
    {
      title: t('email'),
      key: 'email',
      render: (text: any, record: any) => (
        <>
          {record.Attributes.find((a: any) => a.Name === 'email')?.Value}
        </>
      )
    },
    {
      title: t('role'),
      key: 'role',
      render: (text: any, record: any) => (
        <>
          {record.Attributes.find((a: any) => a.Name === 'custom:role')?.Value}
        </>
      )
    },
    {
      title: t('action'),
      key: 'action',
      render: (text: any, record: any) => (
        <>
          {
            (user && user.username !== record.Username) &&
            <Button icon={<DeleteFilled/>} type="primary" danger onClick={() => handleDeleteUser(record)}>{t('delete')}</Button>
          }</>
      )
    },
  ];

  const handleDeleteUser = (record: any) => {
    deleteUser(record.Username).then(r => refetch())
  }

  const createUser = (fields: any) => {
    createCognitoUser(fields.email, fields.name, fields.role, fields.password).then(r => console.log(r)).then(r => refetch())

  }

  const {data: users, refetch} = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const [formInstance] = Form.useForm();


  const onFinish = (fields: any) => {
    createUser(fields)
  }

  const [openModal, setOpenModal] = useState(false);
  const form: React.ReactNode = (
    <Form onFinish={onFinish} form={formInstance}>
      <Form.Item label={t('name')} name={"name"}>
        <Input/>
      </Form.Item>
      <Form.Item label={t('email')} name={"email"}>
        <Input/>
      </Form.Item>
      <Form.Item label={t('password')} name={"password"}>
        <Input.Password/>
      </Form.Item>
      <Form.Item label={t('role')} name={"role"}>
        <Select>
          <Select.Option value="ADMIN">{t('admin')}</Select.Option>
          <Select.Option value="EXTERNAL">{t('external')}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">{t('submit')}</Button>
      </Form.Item>
    </Form>
  )


  return (
    <GeneralView buttonAddLabel={t('addUser')}
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
