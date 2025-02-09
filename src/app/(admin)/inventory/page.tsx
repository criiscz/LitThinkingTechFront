'use client'
import {Button, Form, Input, Select, Tag} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useState} from "react";
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createCompany, deleteCompany, getCompanies, updateCompany} from "@/api/CompanyAPI";
import {createProduct, deleteProduct, getProducts} from "@/api/ProductAPI";

export default function InventoryPage() {

  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
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
      title: 'currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Company',
      key: 'company',
      render: (text: any, record: any) => (
        <Tag color={'green'}>{record.company.name}</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Button icon={<DeleteFilled/>} onClick={() => removeProduct(record)} type="primary" danger>Delete</Button>
        </>
      )
    },
  ];

  const [pagination, setPagination] = useState({current: 1, pageSize: 10})
  const [isEdit, setIsEdit] = useState(false)
  const [formInstance] = Form.useForm()

  // ------- Queries and Mutations
  const {data, refetch, isLoading, isError, error} = useQuery({
    queryKey: ['products', pagination.current, pagination.pageSize],
    queryFn: () => getProducts(pagination.current, pagination.pageSize)
  })

  const {mutate: createNewProduct} = useMutation({
    mutationKey: ['createNewProduct'],
    mutationFn: (product:any) => createProduct(product),
    onSuccess: () => {
      refetch()
    }
  })

  const {mutate: updateProd} = useMutation({
    mutationKey: ['updateProductMutation'],
    mutationFn: ({company, companyId}:{product: any, productId: string}) => updateCompany(company, companyId),
    onSuccess: () => {
      refetch()
    }
  })

  const {mutate: deleteProd} = useMutation({
    mutationKey: ['deleteProductMutation'],
    mutationFn: (productId:number) => deleteProduct(productId),
    onSuccess: () => {
      refetch()
    }
  })

  const {data: companies} = useQuery({
    queryKey: ['companiesGet'],
    queryFn: () => getCompanies(1,1000)
  })
  // -----------------------------

  const editProduct = (record: any) => {
    setIsEdit(true)
    formInstance.setFieldsValue(record)
    setOpenModal(true)
  }

  const removeProduct = (record: any) => {
    deleteProd(record.code)
  }



  const onFinish = (values: any) => {
    if (isEdit) {
      updateProd(
        {
          product: values,
          productId: values.code
        }
      )
    } else {
      createNewProduct(values)
    }
    formInstance.resetFields()
    setOpenModal(false)
  }

  const form: React.ReactNode = (
    <Form onFinish={onFinish} form={formInstance}>
      <Form.Item
        label="code"
        name="code"
        rules={[{required: true, message: 'Please input the code!'}]}
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
        label="Characteristics"
        name="characteristics"
        rules={[{required: true, message: 'Please input the characteristics!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{required: true, message: 'Please input the price!'}]}
      >
        <Input type={'number'}/>
      </Form.Item>
      <Form.Item
        label="Currency"
        name="currency"
        rules={[{required: true, message: 'Please input the currency!'}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Stock"
        name="stock"
        rules={[{required: true, message: 'Please input the stock!'}]}
      >
        <Input type={'number'}/>
      </Form.Item>
      <Form.Item
        label="Company"
        name="companyId"
        rules={[{required: true, message: 'Please input the company!'}]}
      >

        <Select onChange={() => {}}>
          {companies && companies.data.map((company:any) => {
            return (<Select.Option key={company.NIT} value={company.NIT}>{company.name}</Select.Option>)
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Categories (no funcional)"
        rules={[{required: true, message: 'Please input the categories !'}]}
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
    <GeneralView buttonAddLabel={'Add product'}
                 tableColumns={columns}
                 tableData={data && data.data || []}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
    )
}
