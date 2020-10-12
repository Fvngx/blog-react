import React, { useState, useEffect } from 'react'
import cls from 'classnames'
import { MyIcon } from '@/components/MyIcon'
import style from './index.module.scss'

interface IProps {
  searchByCategory: Function
}

export const Categories: React.FC<IProps> = ({searchByCategory}) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    
  },[])

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
              <div onClick={searchByCategory(item.id)} className={style.lineItem} key={item.id}>
                {item.title}
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