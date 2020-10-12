import React, { useState } from 'react'
import Head from 'next/head'
import { Layout, Menu, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import { MyIcon } from '@/components/MyIcon'
import { UserInfo } from '@/components/UserInfo'
import { menus } from './menu'
import style from './index.module.scss'

const { Header, Sider, Content } = Layout


const findActiveMenu = pathname => {
  return menus.find(menu => menu.path === pathname)
}

export const Backend: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const router = useRouter()
  const { pathname } = router
  const activeMenu = findActiveMenu(pathname) 
  
  return (
    <div className={style.wrapper}>
      <Head>
        <title>{activeMenu.title || '后台管理'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Sider className={style.sider} trigger={null} collapsible collapsed={collapsed}>
          <div className={style.logo}>logo</div>
          <Menu theme="dark" className={style.menus} mode="inline" selectedKeys={[activeMenu.path]}>
            {menus.map(item => {
              return item.divider ? (
                <div className={style.divider} key={item.id}></div>
              ) : (
                <Menu.Item
                  key={item.path}
                  onClick={() => {router.push(item.path)}}
                  icon={(<MyIcon type={item.icon} />)}
                >
                    {item.label}
                </Menu.Item>
              )
            })}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className={style.header}>
            <Row>
              <Col span={12}>
                <div className={style.title}>
                  {activeMenu && activeMenu.label}
                </div>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <div className={style.info}>
                  <a
                    className={style.github}
                    href="https://github.com/Fvngx/blog-react"
                    target="_blank"
                  >
                    <MyIcon type="icon-github" />
                  </a>
                  <UserInfo />
                </div>
              </Col>
            </Row>
          </Header>
          <Content className={style.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}