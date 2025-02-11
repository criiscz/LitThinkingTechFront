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
import {useTranslations} from "next-intl";

export default function InventoryPage() {

  const [openModal, setOpenModal] = useState(false);
  const t = useTranslations();
  const columns = [
    {
      title: t('code'),
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: t('characteristics'),
      dataIndex: 'characteristics',
      key: 'characteristics',
    },
    {
      title: t('categories'),
      key: 'categories',
      render: (text: any, record: any) => (
        <>
          {record.categories.map((category: any) => {
            return <Tag key={category.id} color={'blue'}>{category.name}</Tag>
          })}
        </>
      )
    },
    {
      title: t('price'),
      dataIndex: 'price',
      key: 'price',
      render: (text: any, record: any) => (
        <div>${record.price}</div>
      )
    },
    {
      title: t('currency'),
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: t('stock'),
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: t('company'),
      key: 'company',
      render: (text: any, record: any) => (
        <Tag color={'green'}>{record.company.name}</Tag>
      )
    },
    {
      title: t('action'),
      key: 'action',
      render: (text: any, record: any) => (
        <>
          {
            user && user.isAdmin &&
              <Button icon={<DeleteFilled/>} onClick={() => removeProduct(record)} type="primary"
                      danger>{t('delete')}</Button>
          }</>
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
    mutationFn: (product: any) => createProduct(user && user.accessToken, product),
    onSuccess: () => {
      refetch()
    }
  })

  const {mutate: deleteProd} = useMutation({
    mutationKey: ['deleteProductMutation'],
    mutationFn: (productId: number) => deleteProduct(user && user.accessToken, productId),
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
        label={t('code')}
        name="code"
        rules={[{required: true, message: t('pleaseInputCode')}]}
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
        label={t('characteristics')}
        name="characteristics"
        rules={[{required: true, message: t('pleaseInputCharacteristics')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label={t('price')}
        name="price"
        rules={[{required: true, message: t('pleaseInputPrice')}]}
      >
        <Input type={'number'}/>
      </Form.Item>
      <Form.Item
        label={t('currency')}
        name="currency"
        rules={[{required: true, message: t('pleaseInputCurrency')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label={t('stock')}
        name="stock"
        rules={[{required: true, message: t('pleaseInputStock')}]}
      >
        <Input type={'number'}/>
      </Form.Item>
      <Form.Item
        label={t('company')}
        name="companyId"
        rules={[{required: true, message: t('pleaseInputCompany')}]}
      >

        <Select onChange={() => {
        }}>
          {companies && companies.map((company: any) => {
            return (<Select.Option key={company.NIT} value={company.NIT}>{company.name}</Select.Option>)
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label={t('categories')}
        rules={[{required: true, message: t('pleaseInputCategories')}]}
        name="categories"
      >
        <Select mode="tags" style={{width: '100%'}} placeholder="Tags Mode">
          {categories && categories.categories.map((category: any) => {
            return (<Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>)
          })}
        </Select>

      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t('submit')}
        </Button>
      </Form.Item>
    </Form>
  )


  return (
    <GeneralView buttonAddLabel={t('addProduct')}
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
