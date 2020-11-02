import React, { useCallback, useState } from 'react'
import { Form, Button, Input, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { UserProvider } from '@/providers/user'
import Router from 'next/router'
import Head from 'next/head'
import style from './index.module.scss'

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const onFinish = useCallback(values => {
    console.log(values)
    setLoading(true)
    UserProvider.login(values).then(res => {
      sessionStorage.setItem('user', JSON.stringify(res))
      sessionStorage.setItem('token', res.token)
      setLoading(false)
      Router.push('/backend')
    }).catch(e => setLoading(false))
  }, [])

  return (
    <div className={style.wrapper}>
      <Head>
        <title>系统登录</title>
      </Head>
      <Spin spinning={loading}>
        <div className={style.container}>
          <h2>系统登录</h2>
          <Form
            name="login"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{required: true, message: '请输入用户名'}]}
            >
              <Input prefix={<UserOutlined />} size="large" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: '请输入用户名'}]}
            >
              <Input prefix={<LockOutlined />} size="large" type="password" placeholder="请输入密码" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className={style.submit}
                disabled={loading}
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
      <ul className={style.bubbles}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <li key={idx}></li>
        ))}
      </ul>
    </div>
  )
}

export default Login