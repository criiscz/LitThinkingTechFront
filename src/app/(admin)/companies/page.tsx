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
  const t = useTranslations();

  const user = useAuthUser();

  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: t('NIT'),
      dataIndex: 'NIT',
      key: 'nit',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('action'),
      key: 'action',
      render: (text: any, record: any) => {
        if (user && user.isAdmin) {
          return (
            <>
              <Button icon={<EditFilled/>} type="primary" onClick={() => editCompany(record)}>{t('edit')}</Button>
              <Button icon={<DeleteFilled/>} type="primary" danger onClick={() => removeCompany(record)}>{t('delete')}</Button>
            </>
          )
        }
      }
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
        rules={[{required: true, message: t('pleaseInputNIT')}]}
      >
        <Input disabled={isEdit}/>
      </Form.Item>
      <Form.Item
        label={t('name')}
        name="name"
        rules={[{required: true, message: t('pleaseInputName')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Address"
        name={t('address')}
        rules={[{required: true, message: t('pleaseInputAddress')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Phone"
        name={t('phone')}
        rules={[{required: true, message: t('pleaseInputPhone')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <GeneralView
      buttonAddLabel={t('addCompany')}
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
