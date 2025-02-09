'use client'
import {Button, Form, Input} from "antd";
import {signIn} from 'next-auth/react';
import {useRouter} from "next/navigation";

export default function Page(){
    const router = useRouter()

    const handleLogin = async (values:any) => {
        const response = await signIn('credentials', {
            redirect: false,
            email: values.mail,
            password: values.password
        })
        if(response!.ok){
            router.push('/company')
        } else {
            console.log('Login failed')
        }
    }

    return(
        <div className={'flex flex-col items-center justify-center h-dvh'}>
            <div className={'flex w-1/5 bg-blue-50 h-1/2 rounded shadow-2xl flex-col items-center justify-center gap-3'}>
                <h1 className={'text-2xl font-bold mb-10'}>Login</h1>
                <Form
                  onFinish={(values) => {
                      handleLogin(values)
                  }}
                  name="login"
                  layout="vertical"
                  style={{width: '80%'}}
                >
                    <Form.Item
                      name="mail"
                      rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input type="text" placeholder={"Email"} style={{padding: '0.5rem',}}/>
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder={"Password"} style={{padding: '0.5rem'}}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%', marginTop: '2rem'}}>Login</Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
