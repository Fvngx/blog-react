import React from 'react'
import Head from 'next/head'
import { BackTop, Layout } from 'antd'
import { Topnav } from '@/components/Topnav'
import style from './index.module.scss'


const {Header, Footer, Content} = Layout

interface IProps {
  onSearchChange?: Function
}


export const Frontend: React.FC<IProps> = ({onSearchChange, children}) => {
  return (
    <div>
      <Head>
        <title>※星·个人博客</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={style.wrapper}>
        <Header className={style.header}>
          <Topnav onSearchChange={onSearchChange} />
        </Header>
        <Content className={style.content} id="frontendId">
          {children}
          <BackTop visibilityHeight={100} target={() => document.getElementById('frontendId')} />
        </Content>
        <Footer className={style.footer}>blog·23423</Footer>
      </Layout>
    </div>
  )
}