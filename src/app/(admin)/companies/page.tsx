'use client'
import {Button, Form, Input, Modal, Table} from "antd";
import {useTranslations} from "next-intl";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import GeneralView from "@/app/(admin)/components/GeneralView";
import {createCompany, deleteCompany, getCompanies, updateCompany} from "@/api/CompanyAPI";
import useAuthUser from "@/app/hooks/useAuthUser";

export default function DashboardPage() {
  const t = useTranslations('general');

  const user = useAuthUser();

  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: 'NIT',
      dataIndex: 'NIT',
      key: 'nit',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
          <Button icon={<EditFilled/>} type="primary" onClick={() => editCompany(record)}>Edit</Button>
          <Button icon={<DeleteFilled/>} type="primary" danger onClick={() => removeCompany(record)} >Delete</Button>
        </>
      )
    },
  ];

  const [pagination, setPagination] = useState({current: 1, pageSize: 10})
  const [isEdit, setIsEdit] = useState(false)

  const {data, refetch, isLoading, isError, error} = useQuery({
    queryKey: ['companies', pagination.current, pagination.pageSize],
    queryFn: () => getCompanies(user && user.accessToken)
  })

  const [formInstance] = Form.useForm()

  const {mutate: createNewCompany} = useMutation({
    mutationKey: ['createCompany'],
    mutationFn: (company:any) => createCompany(user && user.accessToken, company),
    onSuccess: () => {
      refetch()
    }
  })

  const {mutate: updateComp} = useMutation({
    mutationKey: ['updateCompanyMutation'],
    mutationFn: ({company, companyId}:{company: any, companyId: string}) => updateCompany(user && user.accessToken, company, companyId),
    onSuccess: () => {
      refetch()
    }
  })

  const {mutate: deleteComp} = useMutation({
    mutationKey: ['deleteCompanyMutation'],
    mutationFn: (companyId:number) => deleteCompany(user && user.accessToken, companyId),
    onSuccess: () => {
      refetch()
    }
  })

  const onFinish = (values: any) => {
    if (isEdit) {
      updateComp(
        {
          company: values,
          companyId: values.NIT
        }
      )
    } else {
      createNewCompany(values)
    }
    formInstance.resetFields()
    setOpenModal(false)
  }
  const editCompany = (record: any) => {
    setIsEdit(true)
    formInstance.setFieldsValue(record)
    setOpenModal(true)
  }
  const removeCompany = (record: any) => {
    deleteComp(record.NIT)
  }


  const form: React.ReactNode = (
    <Form onFinish={onFinish} form={formInstance}>
      <Form.Item
        label="NIT"
        name="NIT"
        rules={[{required: true, message: 'Please input the NIT!'}]}
      >
        <Input disabled={isEdit}/>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{required: true, message: 'Please input the name!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{required: true, message: 'Please input the address!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{required: true, message: 'Please input the phone!'}]}
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
    <GeneralView
      buttonAddLabel={'Add Company'}
      tableColumns={columns}
      tableData={data && data}
      pagination={pagination}
      setPagination={setPagination}
      openModal={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      onAdd={() => setOpenModal(true)}
      form={form}/>
  )
}
