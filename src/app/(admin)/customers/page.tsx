'use client'
import GeneralView from "@/app/(admin)/components/GeneralView";
import {useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useMutation, useQuery} from "@tanstack/react-query";
import {createClient, getClients} from "@/api/ClientAPI";
import useAuthUser from "@/app/hooks/useAuthUser";
import {useTranslations} from "next-intl";

export default function CustomersPage() {
  const t = useTranslations();

  const columns = [
    {
      title: t('customerId'),
      dataIndex: 'id',
      key: 'customerID',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('phone'),
      dataIndex: 'phone',
      key: 'phone',
    }
  ];

  const [pagination, setPagination] = useState({current: 1, pageSize: 10})
  const user = useAuthUser();

  const {data, refetch} = useQuery({
    queryKey: ['customers', pagination.current, pagination.pageSize],
    queryFn: () => getClients(user && user.accessToken),
  });

  const {mutateAsync: createNewClient} = useMutation({
    mutationKey: ['createClient'],
    mutationFn: (client) => createClient(user && user.accessToken, client),
  });

  const [openModal, setOpenModal] = useState(false);

  const handleFinish = async (values: any) => {
    createNewClient(values).then((r) => {
      if (r.error) {
        notification.error({
          message: 'Error',
          description: r.error,
        });
        return;
      }
      notification.success({
        message: t('success'),
        description: t('clientCreated'),
      });
      refetch();
      setOpenModal(false);

    }).catch(() => {
      notification.error({
        message: 'Error',
        description: t('errorCreatingClient'),
      });
    });
  }

  const form: React.ReactNode = (
    <Form onFinish={handleFinish}>
      <Form.Item
        label={t('id')}
        name="id"
        rules={[{required: true, message: t('pleaseInputId')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label={t('name')}
        name="name"
        rules={[{required: true, message: t('pleaseInputName')}]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label={t('phone')}
        name="phone"
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
    <GeneralView buttonAddLabel={t('addClient')}
                 tableColumns={columns}
                 tableData={data && data}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 pagination={pagination}
                 setPagination={setPagination}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
  )
}
