'use client'

import Sider from "antd/es/layout/Sider";
import {Avatar, Breadcrumb, Layout, Menu, MenuProps, Modal} from "antd";
import {DashboardOutlined, SettingOutlined} from "@ant-design/icons";
import {Content, Footer} from "antd/es/layout/layout";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import UserPanel from "@/app/components/UserPanel";
import useAuthUser from "@/app/hooks/useAuthUser";
import {useTranslations} from "next-intl";
import {
  RiBillLine,
  RiBookShelfLine,
  RiBuilding2Line,
  RiGroup3Line,
  RiListCheck, RiUser2Fill, RiUserLine,
  RiUserSmileLine
} from "@remixicon/react";
import LocaleChanger from "@/app/components/LocaleChanger";

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

export default function AuthenticatedLayout({children}: { children: React.ReactNode }) {

  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const user = useAuthUser();
  const t = useTranslations();

  const itemsAdmin: MenuItem[] = [
    getItem(t('companies'), '1', <RiBuilding2Line/>),
    getItem(t('categories'), '2', <RiBookShelfLine/>),
    getItem(t('inventory'), '3', <RiListCheck/>),
    getItem(t('orders'), '4', <RiBillLine/>),
    getItem(t('clients'), '5', <RiUserSmileLine/>),
    getItem(t('users'), '6', <RiGroup3Line/>),
  ]

  const items: MenuItem[] = [
    getItem(t('companies'), '1', <RiBuilding2Line/>),
    getItem(t('categories'), '2', <RiBookShelfLine/>),
    getItem(t('inventory'), '3', <RiListCheck/>),
    getItem(t('orders'), '4', <RiBillLine/>),
    getItem(t('clients'), '5', <RiUserSmileLine/>),
  ]

  const [selectedKeys, setSelectedKeys] = useState(['1']);


  const onClick = (e: { key: string }) => {
    const routes: { [key: string]: string } = {
      '1': '/companies',
      '2': '/categories',
      '3': '/inventory',
      '4': '/orders',
      '5': '/customers',
      '6': '/users',
    };

    const selectedKey = e.key;
    setSelectedKeys([selectedKey]);
    router.push(routes[selectedKey]);
  };

  const getSelectedLabel = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    if (user && user.isAdmin) {
      const item = itemsAdmin.find((item) => item!.key === selectedKeys[0]);
      // @ts-expect-error
      return item ? item.label : '';
    } else {
      const item = items.find((item) => item!.key === selectedKeys[0]);
      // @ts-expect-error
      return item ? item.label : '';
    }
  }

  const [openModal, setOpenModal] = useState(false);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider className={'flex flex-col justify-between h-dvh'} width={'15%'} collapsible collapsed={collapsed}
             onCollapse={(value) => setCollapsed(value)}>
        <div className={'flex flex-col justify-between h-full'}>
          <div className="bg-gray-500  h-10 rounded-lg m-3 mt-5 mb-10"></div>
          <Menu onClick={onClick} theme={"dark"} defaultSelectedKeys={['1']} mode="inline" items={
            user && user.isAdmin ? itemsAdmin : items
          }/>
          <div onClick={() => setOpenModal(true)}
               className="bg-gray-700 h-10 rounded-lg pb-8 pt-8 m-3 mt-5 mb-10 flex items-center justify-center gap-3 cursor-pointer hover:bg-gray-500 active:bg-gray-400">
            <Avatar size={32} icon={<RiUserLine/>}/>
            {!collapsed && <p className={'text-center text-white'}>{user && user.name}</p>}
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
              {title: user && user.isAdmin ? 'Admin' : 'External'},
              {title: getSelectedLabel()},
            ]
          }>
          </Breadcrumb>
          <div className={'bg-white rounded min-h-full h-full'} style={{padding: 24, minHeight: 360}}>
            {children}
          </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>Lite Thinking - Tech Test |2025| Created by criiscz</Footer>
      </Layout>
      <Modal open={openModal} title={t('userModal')} onOk={() => setOpenModal(false)} onCancel={() => setOpenModal(false)}
             footer={null}>
        <div className={'flex flex-col justify-evenly gap-10'}>
          <LocaleChanger/>
          <UserPanel/>
        </div>
      </Modal>
    </Layout>
  )
}
