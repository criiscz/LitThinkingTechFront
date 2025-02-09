'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useState} from "react";
import {Button, Form, Input} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";

export default function OrdersPage(){

    const columns = [
      {
        title: 'Order ID',
        dataIndex: 'orderID',
        key: 'orderID',
      },
      {
        title: 'Product ID',
        dataIndex: 'productID',
        key: 'productID',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
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
        orderID: '123456789',
        productID: '123456789',
        quantity: '1',
        total: '123456789',
      },
      {
        key: '2',
        orderID: '123456789',
        productID: '123456789',
        quantity: '1',
        total: '123456789',
      }]

    const [openModal, setOpenModal] = useState(false);
    const form : React.ReactNode = (
      <Form>
        <Form.Item label="Order ID">
          <Input/>
        </Form.Item>
        <Form.Item label="Product ID">
          <Input/>
        </Form.Item>
        <Form.Item label="Quantity">
          <Input/>
        </Form.Item>
        <Form.Item label="Total">
          <Input/>
        </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
      </Form>
    )


    return(
      <GeneralView buttonAddLabel={'Add Order'}
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
