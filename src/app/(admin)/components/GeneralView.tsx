import Search from "antd/es/input/Search";
import {Button, Form, Input, Modal, Table} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import useAuthUser from "@/app/hooks/useAuthUser";

interface GeneralViewProps {
  buttonAddLabel: string;
  tableColumns: any[];
  tableData: any[];
  openModal: boolean;
  onOk: () => void;
  onCancel: () => void;
  onAdd: () => void;
  form: React.ReactNode;
  pagination?: any;
  setPagination?: any;
  isLoading?: boolean;
  modalTitle?: string;
}

export default function GeneralView(
  {
    buttonAddLabel,
    tableColumns,
    tableData,
    openModal,
    onOk,
    onCancel,
    form,
    onAdd,
    pagination,
    setPagination,
    isLoading,
    modalTitle
  }: GeneralViewProps
) {

  const user = useAuthUser();

  return (
    <div className={'flex flex-col gap-10 mt-5'}>
      <div className={'flex flex-row w-full content-between gap-3'}>
        { user && user.isAdmin && <Button icon={<PlusCircleFilled/>} type="primary" onClick={() => onAdd()}>{buttonAddLabel}</Button> || null }
      </div>
      <section>
        <Table columns={tableColumns} loading={isLoading} dataSource={tableData} pagination={{
          ...pagination,
          showSizeChanger: false,
          onChange: (page: number, pageSize: number) => setPagination({current: page, pageSize: pageSize})
        }}/>
      </section>
      <Modal
        open={openModal}
        title={modalTitle ?? buttonAddLabel}
        onCancel={() => onCancel()}
        destroyOnClose={true}
        footer={null}>
        {form}
      </Modal>
    </div>
  )
}
