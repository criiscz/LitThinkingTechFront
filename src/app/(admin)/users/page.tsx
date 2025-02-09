'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useState} from "react";
import {Button, Form, Input} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";


export default function UsersPage(){
    const columns = [
        {
            title: 'User ID',
            dataIndex: 'userID',
            key: 'userID',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
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

    const data = [
        {
            key: '1',
            userID: '123456789',
            name: 'User 1',
            email: 'email@mail.com',
            role: 'Admin',
        },
        {
            key: '2',
            userID: '123456789',
            name: 'User 2',
            email: 'mail2@mail.com',
            role: 'User',
        }
        ]

    const [openModal, setOpenModal] = useState(false);
    const form : React.ReactNode = (
      <Form>

      </Form>
    )


    return(
      <GeneralView buttonAddLabel={'Add User'}
                   tableColumns={columns}
                   tableData={data}
                   openModal={openModal}
                   onOk={() => setOpenModal(false)}
                   onCancel={() => setOpenModal(false)}
                   onAdd={() => setOpenModal(true)}
                   form={form}
      />
    )
}
