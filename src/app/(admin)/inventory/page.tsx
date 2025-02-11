'use client'
import {Button, Form, Input, Select, Tag} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useState} from "react";
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createCompany, deleteCompany, getCompanies, updateCompany} from "@/api/CompanyAPI";
import {createProduct, deleteProduct, getProducts} from "@/api/ProductAPI";
import useAuthUser from "@/app/hooks/useAuthUser";
import {getCategories} from "@/api/CategoryAPI";

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
      title: 'Categories',
      key: 'categories',
      render: (text: any, record: any) => (
        <>
          {record.categories.map((category:any) => {
            return <Tag key={category.id} color={'blue'}>{category.name}</Tag>
          })}
        </>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: any, record: any) => (
        <div>${record.price}</div>
      )
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
  const user = useAuthUser();

  // ------- Queries and Mutations
  const {data, refetch, isLoading, isError, error} = useQuery({
    queryKey: ['products', pagination.current, pagination.pageSize],
    queryFn: () => getProducts(user && user.accessToken)
  })

  const {mutate: createNewProduct} = useMutation({
    mutationKey: ['createNewProduct'],
    mutationFn: (product:any) => createProduct(user && user.accessToken, product),
    onSuccess: () => {
      refetch()
    }
  })

  const {mutate: deleteProd} = useMutation({
    mutationKey: ['deleteProductMutation'],
    mutationFn: (productId:number) => deleteProduct(user && user.accessToken,productId),
    onSuccess: () => {
      refetch()
    }
  })

  const {data: companies} = useQuery({
    queryKey: ['companiesGet'],
    queryFn: () => getCompanies(user && user.accessToken)
  })
  // -----------------------------


  const removeProduct = (record: any) => {
    deleteProd(record.code)
  }

  const {data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(user && user.accessToken),
  });



  const onFinish = (values: any) => {
    createNewProduct(values)
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
          {companies && companies.map((company:any) => {
            return (<Select.Option key={company.NIT} value={company.NIT}>{company.name}</Select.Option>)
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label="Categories "
        rules={[{required: true, message: 'Please input the categories !'}]}
        name="categories"
      >
        <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
          {categories && categories.categories.map((category:any) => {
            return (<Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>)
          })}
        </Select>

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
                 tableData={data && data || []}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
    )
}
