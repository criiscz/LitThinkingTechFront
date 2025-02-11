'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useState} from "react";
import {Button, Drawer, Form, Input, Modal, notification, Select, Table, Tag} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createOrder, getOrders} from "@/api/OrderAPI";
import useAuthUser from "@/app/hooks/useAuthUser";
import {getClients} from "@/api/ClientAPI";
import {getProducts} from "@/api/ProductAPI";
import {useTranslations} from "next-intl";

export default function OrdersPage() {

  const [pagination, setPagination] = useState({current: 1, pageSize: 5})
  const t = useTranslations();

  const columns = [
    {
      title: t('orderID'),
      dataIndex: 'id',
      key: 'orderID',
    },
    {
      title: t('clientID'),
      key: 'clientID',
      render: (text: any, record: any) => (
        <Tag color={'blue'}>{record.client.id +"-"+ record.client.name}</Tag>
      )
    },
    {
      title: t('products'),
      key: 'productID',
      render: (text: any, record: any) =>
        {
          return record.productList.map((prod: any) => {
            const product = products && products.find((p: any) => p.code === prod.productId);
            return (
              <Tag color={'green'}>{product && prod.quantity + " " + product.name + ": $" + prod.price}</Tag>
            )
          })
        }

    },
    {
      title: t('total'),
      key: 'total',
      render: (text: any, record: any) => (
        <span>${record.productList.reduce((acc: number, prod: any) => acc + prod.quantity * prod.price, 0)}</span>
      )
    },
  ];

  const user = useAuthUser();

  const {data, refetch, isLoading, isRefetching} = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(user && user.accessToken),
  });

  const {mutateAsync: createNewOrder, isPending: isCreating} = useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (order) => createOrder(user && user.accessToken, order),
  });

  const [formInstance] = Form.useForm();

  const onSubmit = (values: any) => {
    const order = {
      clientId: values.clientId,
      productIdsList: productsToAdd.map((product: any) => ({
        productCode: product.code,
        quantity: product.quantity,
        price: product.price
      }))
    } as any;
    createNewOrder(order).then((res) => {
      if (res.error) {
        notification.error({message: t('errorCreatingOrder')});
        return;
      }
      formInstance.resetFields();
      refetch();
      setOpenModal(false);
      notification.success({message: t('orderCreated')});
    });
  }

  const {data: clients} = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(user && user.accessToken),
  })

  const {data: products} = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(user && user.accessToken),
  });

  const [openModal, setOpenModal] = useState(false);
  const [openAddProductToOrder, setOpenAddProductToOrder] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({code: '', stock: 0, price: 0});
  const [productsToAdd, setProductsToAdd] = useState<any>([]);
  const addQuantity = (values: any) => {
    setProductsToAdd(
      [...productsToAdd, {...selectedProduct, quantity: values.quantity, price: selectedProduct.price}]
    );
    setOpenAddProductToOrder(false);
  }

  const form: React.ReactNode = (
    <Form form={formInstance} onFinish={onSubmit} layout={'vertical'}>
      <Form.Item
        label={t('clientID')}
        name="clientId"
        rules={[{required: true, message: t('pleaseInputClientID')}]}
      >
        <Select>
          {
            clients && clients.map((client: any) => (
              <Select.Option value={client.id}>{client.id + "-" + client.name}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item
        label={t('products')}
        name="productsId"
        rules={[{required: true, message: t('pleaseInputProducts')}]}
      >
        <Select
          mode="multiple"
          onChange={(value: any) => {
            const product = products && products.find((product: any) => product.code === value[value.length - 1]);
            if (product && !productsToAdd.some((p: any) => p.code === product.code)) {
              setSelectedProduct(product);
              setOpenAddProductToOrder(true);
            }
            setProductsToAdd(productsToAdd.filter((product: any) => value.includes(product.code)));
          }}
        >
          {
            products && products.map((product: any) => (
              <Select.Option
                value={product.code}>{`${product.code} - ${product.name}: \$${product.price}`}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
    </Form>
  )


  return (
    <>
      <GeneralView buttonAddLabel={t('addOrder')}
                   tableColumns={columns}
                   tableData={data && data}
                   openModal={false}
                   pagination={pagination}
                   setPagination={setPagination}
                   onOk={() => {
                   }}
                   onCancel={() => {
                   }}
                   onAdd={() => setOpenModal(true)}
                   isLoading={isLoading || isRefetching}
                   form={null}
      />
      <Drawer
        title={t('createOrder')}
        open={openModal}
        footer={null}
        onClose={() => setOpenModal(false)}
        placement={'right'}
        width={'40%'}
      >
        <div className={'flex flex-col justify-between gap-3 h-full'}>
          {form}
          <div className={'flex flex-col gap-3'}>
            <h2 className={'font-bold text-xl'}>{t('productsToCreateOrder')}</h2>
            <Table
              columns={[
                {
                  title: t('code'),
                  dataIndex: 'code',
                  key: 'code',
                },
                {
                  title: t('name'),
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: t('quantity'),
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: t('price'),
                  dataIndex: 'price',
                  key: 'price',
                },
                {
                  title: t('total'),
                  key: 'total',
                  render: (text: any, record: any) => (
                    <span>${record.quantity * record.price}</span>
                  )
                },
              ]}
              dataSource={
                products &&
                products
                  .filter((product: any) => productsToAdd.find((productToAdd: any) => productToAdd.code === product.code))
                  .map((product: any) => {
                    return {
                      ...product,
                      quantity: productsToAdd.find((productToAdd: any) => productToAdd.code === product.code).quantity
                    }
                  })
              }
              pagination={{pageSize: 5}}

            />
            <h3 className={'font-bold text-xl'}>Total:
              ${productsToAdd.reduce((acc: number, product: any) => acc + product.quantity * product.price, 0)}</h3>
            <Button type={'primary'} onClick={() => formInstance.submit()}>{t('createOrder')}</Button>
          </div>
        </div>
        <Modal
          title={t('addProductToOrder')}
          open={openAddProductToOrder}
          footer={null}
        >
          {/*<h3>Adding Product to Order: {products && products.data && products.data.find((product:any) => product.code === selectedProduct.code) || ''}</h3>*/}
          <Form onFinish={addQuantity} layout={'vertical'}>
            <Form.Item
              label={t('quantity')}
              name="quantity"
              rules={[{required: true, message: t('pleaseInputQuantity')}]}
            >
              <Input type={'number'} max={selectedProduct.stock}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isCreating}>{t('submit')}</Button>
            </Form.Item>
          </Form>
        </Modal>

      </Drawer>
    </>
  )
}
