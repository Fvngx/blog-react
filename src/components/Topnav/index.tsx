import React, { useState } from 'react'
import Link from 'next/link'
import { MyIcon } from '@/components/MyIcon'
import { Space, Input } from 'antd'
import { useRouter } from 'next/router'
import cls from 'classnames'
import style from './index.module.scss'

const { Search } = Input


const defaultMenu = [
  {
    label: '首页',
    path: '/',
    icon: 'icon-icon_huabanfuben',
  },
  // {
  //   label: '分类',
  //   path: '/category',
  //   icon: '',
  // },
  // {
  //   label: '标签',
  //   path: '/tags',
  //   icon: '',
  // },
  {
    label: '归档',
    path: '/archives',
    icon: 'icon-icon-',
  },
  // {
  //   label: '收藏',
  //   path: '/alive',
  //   icon: 'icon-shoucang1',
  // },
  {
    label: '关于',
    path: '/about',
    icon: 'icon-guanyuwomen',
  }
]

export const Topnav: React.FC = () => {
  const router = useRouter()
  const pathname = router.pathname

  const titleList = [...defaultMenu]

  const onSearch = (value) => {
    router.push({pathname: '/', query: {page: 1, content: value}})
  }

  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <Link href="/">
          {/* <MyIcon type="icon-xingxi" /> */}
          <a>
            <MyIcon className={style.icon} type="icon-keji1" />
            ※星·个人博客
          </a>
        </Link>
      </div>

      <nav>
        <ul>
          <Space className={style.menu} size="large">
            {titleList.map(item => {
              return (
                <li 
                  key={item.label}
                  className={cls(style.item, {[style.active]: item.path === pathname})}
                  onClick={() => router.push(item.path)}
                >
                    <a>
                      <MyIcon className={style.icon} type={item.icon} />
                      {item.label}
                    </a>
                </li>
              )
            })}
          </Space>
        </ul>
      </nav>
      <Search className={style.searchBar} placeholder="输入关键词" enterButton style={{width: 180}} onSearch={onSearch} />
    </div>
  )
}