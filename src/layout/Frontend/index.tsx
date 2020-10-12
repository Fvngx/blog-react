import React from 'react'
import Head from 'next/head'
import { BackTop, Layout } from 'antd'
import { Topnav } from '@/components/Topnav'
import { MyIcon } from '@/components/MyIcon'
import style from './index.module.scss'


const {Header, Footer, Content} = Layout


export const Frontend: React.FC = ({children}) => {
  return (
    <div>
      <Head>
        <title>※星·个人博客</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={style.wrapper}>
        <Header className={style.header}>
          <Topnav  />
        </Header>
        <Content className={style.content} id="frontendId">
          <div className={style.container}>
            {children}
            <BackTop className={style.backtop} visibilityHeight={100} target={() => document.getElementById('frontendId')}>
              <MyIcon className={style.icon} type="icon-up" />
            </BackTop>
          </div>
          <Footer className={style.footer}>blog·23423</Footer>
        </Content>
      </Layout>
    </div>
  )
}