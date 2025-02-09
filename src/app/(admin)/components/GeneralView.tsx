import Search from "antd/es/input/Search";
import {Button, Form, Input, Modal, Table} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";

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
    setPagination
  }: GeneralViewProps
) {
  return (
    <div className={'flex flex-col gap-10 mt-5'}>
      <div className={'flex flex-row w-full content-between gap-3'}>
        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton/>
        <Button icon={<PlusCircleFilled/>} type="primary" onClick={() => onAdd()}>{buttonAddLabel}</Button>
      </div>
      <section>
        <Table columns={tableColumns} dataSource={tableData} pagination={{
          ...pagination,
          showSizeChanger: true,
          onChange: (page: number, pageSize: number) => setPagination({current: page - 1, pageSize: pageSize})
        }}/>
      </section>
      <Modal
        open={openModal}
        title="Basic Modal"
        onCancel={() => onCancel()}
        destroyOnClose={true}
        footer={null}>
        {form}
      </Modal>
    </div>
  )
}
