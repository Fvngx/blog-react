import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MyIcon } from '@/components/MyIcon'
import Router from 'next/router'
import { Menu, Dropdown, Avatar } from 'antd'

const menus = [
  {
    label: '个人中心',
    icon: 'user',
    path: '/backend/ownspace',
  },
]

export const UserInfo = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let info = sessionStorage.getItem('user')
    try {
      info = JSON.parse(info) || {name: 'name'}
      setUser(info as any)
    } catch (e) {}

    if (!info) {
      // Router.replace('/backend/login')
    }
  }, [])

  const menu = () => {
    const logout = () => {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    }
    return (
      <Menu>
        {menus.map(menu => (
          <Menu.Item key={menu.path}>
            <Link href={menu.path}>
              <a>{menu.label}</a>
            </Link>
          </Menu.Item>
        ))}

        <Menu.Item onClick={logout}>
          <Link href="/backend/login">
            <a>退出登录</a>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }


  return (
    <Dropdown overlay={menu}>
      <div>
        {user && user.avatar ? (
          <Avatar size={'small'} src={user.avatar} />
        ) : (
          <Avatar size={'small'} icon={<MyIcon type="icon-geren" />} />
        )}
        {user ? <span style={{marginLeft: 8}}>Hi, {user.name}</span> : null}
      </div>
    </Dropdown>
  )
}