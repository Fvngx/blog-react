import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu, Row, Col, Dropdown, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { MyIcon } from '@/components/MyIcon'
import { UserInfo } from '@/components/UserInfo'
import { menus } from './menu'
import style from './index.module.scss'

const { Header, Sider, Content } = Layout


const findActiveMenu = pathname => {
  return menus.find(menu => menu.path === pathname)
}

const ResourceCreate = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link href={'/backend/article/editor'}>
          <a target="_blank">
            <span>新建文章</span>
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button style={{width: '100%'}} type="link" size="large" icon={<PlusOutlined />}>
        新建
      </Button>
    </Dropdown>
  )
}

export const Backend: React.FC = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  const activeMenu = findActiveMenu(pathname) || {} as any
  return (
    <div className={style.wrapper}>
      <Head>
        <title>{activeMenu.title || '管理后台'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Sider className={style.sider} trigger={null}>
          <div className={style.logo}>管理后台</div>
          <div className={style.resourceCreate}>
            <ResourceCreate />
          </div>
          <Menu theme="dark" className={style.menus} mode="inline" selectedKeys={[activeMenu.path]}>
            {menus.map(item => {
              return item.divider ? (
                <div className={style.divider} key={item.id}></div>
              ) : (
                <Menu.Item
                  className={style.menuItem}
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