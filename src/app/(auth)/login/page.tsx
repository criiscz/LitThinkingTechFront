'use client'
import {Button, Form, Input} from "antd";
import {handleSignIn} from "@/app/lib/cognitoActions";
import {useRouter} from "next/navigation";
import {message} from "antd";
import {useTranslations} from "next-intl";

export default function Page() {

  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (values: any) => {
    const error = await handleSignIn(values.mail, values.password)
    if (error) {
      messageApi.error(error)
      return
    }
    router.push('/dashboard')
  }

  const t = useTranslations();

  return (
    <div className={'flex flex-col items-center justify-center h-dvh bg-gray-900'}>
      <div className={'flex w-1/5 bg-white h-1/2 rounded shadow-2xl flex-col items-center justify-center gap-3'}>
        <h1 className={'text-2xl font-bold mb-10'}>Login</h1>
        <Form
          onFinish={async (values) => {
            await handleLogin(values)
          }}
          name="login"
          layout="vertical"
          style={{width: '80%'}}
        >
          <Form.Item
            name="mail"
            rules={[{required: true, message: t('pleaseInputEmail')}]}
          >
            <Input type="text" placeholder={"Email"} style={{padding: '0.5rem',}}/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{required: true, message: t('pleaseInputPassword')}]}
          >
            <Input.Password placeholder={"Password"} style={{padding: '0.5rem'}}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{width: '100%', marginTop: '2rem'}}>Login</Button>
          </Form.Item>
        </Form>
      </div>
      {contextHolder}
    </div>
  )
}
