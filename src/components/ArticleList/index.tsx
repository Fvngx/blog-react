import React from 'react'
import Link from 'next/link'
import { Pagination } from 'antd'
import cls from 'classnames'
import * as dayjs from 'dayjs'
import LazyLoad from 'react-lazy-load'
import style from './index.module.scss'


interface IProps {
  articles: any[]
  bordered?: boolean
  asCard?: boolean
  needMeta?: boolean
}

export const ArticleList: React.FC<IProps> = ({
  articles = [],
  bordered = false,
  asCard = false,
  needMeta = true,
}) => {
   // 分页器页面更改
   const onPageChange = (value) => {
    console.log(value);
    
  }
  return (
    <div className={cls(style.wrapper, asCard ? style.asCard : false)}>
      {articles && articles.length ? (
        articles.map(article => {
          return (
            <div
              key={article.id}
              className={cls(
                style.articleListItem,
                bordered ? style.isBordered : false,
                asCard ? style.asCard : false
              )}
            >
              <Link 
                href={`/article/[id]`}
                as={`/article/${article.id}`}
                scroll={false}
              >
                <a>
                  <div className={style.info}>{article.cover && (
                    <LazyLoad offset={500} once >
                      <div className={style.imgWrapper}>
                        <img src={article.cover} alt="cover"/>
                      </div>
                    </LazyLoad>
                    )}
                    <div className={style.textInfoWrapper}>
                      <p className={style.title}>{article.title}</p>
                      <p className={style.desc}>{article.summary}</p>
                      <div className={style.meta}>{article.category ? (
                        <>
                          <span className={style.category}>{article.category ? article.category.label : ''}</span>
                          <span className={style.seperator}>·</span>
                        </>
                      ) : null}
                        <span>{article.views}</span>
                        {/* <span className={style.pullRight}>{dayjs.default(article.publisht).format('YYYY-MM-DD HH:mm:ss')}</span> */}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          )
        })
      ) : (
        <div className={style.empty}>暂无数据</div>
      )}
      <Pagination className={style.pagination} onChange={onPageChange} total={50} />
    </div>
  )
}

