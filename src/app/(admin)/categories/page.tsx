'use client'
import {Button, Form, Input, notification} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import GeneralView from "@/app/(admin)/components/GeneralView";
import {createCategory, getCategories} from "@/api/CategoryAPI";
import useAuthUser from "@/app/hooks/useAuthUser";
import {useTranslations} from "next-intl";

export default function CategoriesPage() {
  const t = useTranslations();

  const columns = [
    {
      title: t('categoryId'),
      dataIndex: 'id',
      key: 'customerID',
    },
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
    },
  ];

  const user = useAuthUser();

  const {data, refetch} = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(user && user.accessToken),
  });

  const {mutateAsync: createNewCategory} = useMutation({
    mutationKey: ['createCategory'],
    mutationFn: (category) => createCategory(user && user.accessToken, category),
  });

  const [openModal, setOpenModal] = useState(false);
  const [formInstance] = Form.useForm();

  const handleSubmit = async (values: any) => {
    createNewCategory(values).then((r) => {
      if (r.error) {
        notification.error({
          message: 'Error',
          description: r.error,
        });
        return;
      }
      notification.success({
        message: t('success'),
        description: t('categoryCreated'),
      });
      refetch();
      setOpenModal(false);
      formInstance.resetFields();
    })
  }

  const form: React.ReactNode = (
    <Form onFinish={handleSubmit} form={formInstance}>
      <Form.Item
        label={t('name')}
        name="name"
        rules={[{required: true, message: t('pleaseInputName')}]}
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
    <GeneralView buttonAddLabel={t('addCategory')}
                 modalTitle={t('category')}
                 tableColumns={columns}
                 tableData={data && data.categories}
                 openModal={openModal}
                 onOk={() => setOpenModal(false)}
                 onCancel={() => setOpenModal(false)}
                 onAdd={() => setOpenModal(true)}
                 form={form}
    />
  )
}
