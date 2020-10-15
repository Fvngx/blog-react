import React, { useState, useEffect } from 'react'
import cls from 'classnames'
import { MyIcon } from '@/components/MyIcon'
import { useRouter } from 'next/router'
import style from './index.module.scss'
import Item from 'antd/lib/list/Item'


export const Categories: React.FC = () => {
  const [categories, setCategories] = useState([
    {
      id: '1',
      title: '分类1',
      totals: 20,
    },
    {
      id: '2',
      title: '分类2',
      totals: 20,
    },
    {
      id: '3',
      title: '分类3',
      totals: 20,
    },
    {
      id: '4',
      title: '分类4',
      totals: 20,
    },
    {
      id: '5',
      title: '分类5',
      totals: 20,
    },
  ])
  const [checkCategory, setCheckCategory] = useState('')
  const router = useRouter()
  useEffect(() => {
    
  },[])

  const searchByCategory = (id) => {
    // push query
    setCheckCategory(id)
    router.push({query: {type: 'category', id: id}})
    console.log('searchByCategory---');
    
  }

  return (
    <div className={cls(style.wrapper)}>
      <div className={style.title}>
        <MyIcon className={style.icon} type="icon-fenlei" />
        分类
      </div>
      <div className={style.content}>
        {categories.length ? (
          categories.map(item => {
            return (
              <div
                onClick={() => searchByCategory(item.id)}
                className={cls(style.lineItem, checkCategory === item.id ? style.active : false)}
                key={item.id}
              >
                {item.title} ({item.totals})
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