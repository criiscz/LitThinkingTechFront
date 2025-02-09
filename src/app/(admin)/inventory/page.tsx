'use client'
import {Button, Form} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useState} from "react";
import GeneralView from "@/app/(admin)/components/GeneralView";

export default function InventoryPage() {

  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Characteristics',
      dataIndex: 'characteristics',
      key: 'characteristics',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
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
      code: '123456789',
      characteristics: 'Characteristics 1',
      price: '123456789',
      company: 'Company 1',
    },
    {
      key: '2',
      code: '123456789',
      characteristics: 'Characteristics 2',
      price: '123456789',
      company: 'Company 2',
    }]

  const form: React.ReactNode = (
    <Form ></Form>
  )

  return (
    <GeneralView buttonAddLabel={'Add product'}
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
