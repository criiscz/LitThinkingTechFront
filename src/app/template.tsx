'use client';
import Sider from "antd/es/layout/Sider";
import {Avatar, Breadcrumb, Layout, Menu, MenuProps, Modal} from "antd";
import {ReactNode, useState} from "react";
import {DashboardOutlined, SettingOutlined} from "@ant-design/icons";
import {Content, Footer} from "antd/es/layout/layout";
import {useRouter} from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export default function Template({children}: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const items: MenuItem[] = [
    getItem('Empresas', '1', <DashboardOutlined/>),
    getItem('Inventario', '2', <SettingOutlined/>),
    getItem('Ordenes', '3', <SettingOutlined/>),
    getItem('Clientes', '4', <SettingOutlined/>),
    getItem('Usuarios', '5', <SettingOutlined/>),
  ]

  const [selectedKeys, setSelectedKeys] = useState(['1']);

  const onClick = (e: any) => {
    if (e.key === '1') {
      setSelectedKeys(['1']);
      router.push('/companies');
    }
    if (e.key === '2') {
      setSelectedKeys(['2']);
      router.push('/inventory');
    }
    if (e.key === '3') {
      setSelectedKeys(['3']);
      router.push('/orders');
    }
    if (e.key === '4') {
      setSelectedKeys(['4']);
      router.push('/customers');
    }
    if (e.key === '5') {
      setSelectedKeys(['5']);
      router.push('/users');
    }

    console.log('click ', e);
  }

  const getSelectedLabel = () => {
    const item = items.find((item) => item!.key === selectedKeys[0]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return item ? item.label : '';
  }

  const [openModal, setOpenModal] = useState(false);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider className={'flex flex-col justify-between h-dvh'} width={'15%'} collapsible collapsed={collapsed}
             onCollapse={(value) => setCollapsed(value)}>
        <div className={'flex flex-col justify-between h-full'}>
          <div className="bg-gray-500  h-10 rounded-lg m-3 mt-5 mb-10"></div>
          <Menu onClick={onClick} theme={"dark"} defaultSelectedKeys={['1']} mode="inline" items={items}/>
          <div onClick={() => setOpenModal(true)} className="bg-gray-700 h-10 rounded-lg pb-8 pt-8 m-3 mt-5 mb-10 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-500 active:bg-gray-400">
            <Avatar size={32} icon={<SettingOutlined/>}/>
            {!collapsed && <p className={'text-center text-white'}>Admin</p>}
          </div>
        </div>
      </Sider>
      <Layout>
        <Content style={{
          padding: 24,
          minHeight: 360,
          height: '100%',
          background: '#f0f2f5',
          borderRadius: '20px',
        }}>
          <Breadcrumb style={{margin: '16px 0'}} items={
            [
              {title: getSelectedLabel()},
            ]
          }>
          </Breadcrumb>
          <div className={'bg-white rounded min-h-full h-full'} style={{padding: 24, minHeight: 360}}>
            {children}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Lite Thiking - Tech Test  |2025| Created by criiscz</Footer>
      </Layout>
      <Modal open={openModal} title="User Modal" onOk={() => setOpenModal(false)} onCancel={() => setOpenModal(false)}>
      </Modal>
    </Layout>
  )
}
