import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MyIcon } from '@/components/MyIcon'
import cls from 'classnames'
import style from './index.module.scss'

interface IProps {
  needTitle?: boolean
  asCard?: boolean
}

export const HotArticles: React.FC<IProps> =({
  needTitle = true,
  asCard = false
}) => {
  const [articles, setArticles] = useState([
    {
      id: '1',
      title: '问斩标题1',
    },
    {
      id: '2',
      title: '问斩标题1',
    },
    {
      id: '3',
      title: '问斩标题1',
    },
    {
      id: '4',
      title: '问斩标题1',
    },
    {
      id: '5',
      title: '问斩标题1',
    },
  ])

  return (
    <div className={cls(style.wrapper)}>
      <div className={style.title}>
        <MyIcon className={style.icon} type="icon-mn_remen" />
        热门
      </div>
      <div className={style.content}>
        {articles.length ? (
          articles.map(item => {
            return (
              <div className={style.lineItem} key={item.id}>
                <Link href={`/article/[id]`} as={`/article/${item.id}`}>
                  <a>
                    {item.title}
                  </a>
                </Link>
              </div>
            )
          })
        ) : (
          <div className={style.empty}>暂无数据</div>
        )}
      </div>
    </div>
  )
}
