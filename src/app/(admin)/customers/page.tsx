'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useState} from "react";
import {Button, Form, Input} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";

export default function CustomersPage(){
    const columns = [
        {
            title: 'Customer ID',
            dataIndex: 'customerID',
            key: 'customerID',
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

    const data = [
        {
            key: '1',
            customerID: '123456789',
            name: 'Customer 1',
            email: 'mail@mail.com',
            phone: '123456789',
        },
        {
            key: '2',
            customerID: '123456789',
            name: 'Customer 2',
            email: 'mail2@mail.com',
            phone: '123456789',
        }
        ]

    const [openModal, setOpenModal] = useState(false);
    const form : React.ReactNode = (
      <Form>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )


    return(
      <GeneralView buttonAddLabel={'Add Client'}
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
