import React, { useCallback, useState } from 'react'
import { Form, Button, Input } from 'antd'
import Router from 'next/router'
import Head from 'next/head'
import style from './index.module.scss'

const Login: React.FC = () => {

  return (
    <div className={style.wrapper}>
      <Head>
        <title>系统登录</title>
      </Head>
      <div className={style.container}>
        <h2>系统登录</h2>
      </div>
    </div>
  )
}

export default Login