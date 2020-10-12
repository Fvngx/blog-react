import React, { useState, useCallback, useEffect } from 'react'
import { NextPage } from 'next'
import { BackTop } from 'antd'
import { Frontend } from '@/layout/Frontend'
import { ArticleList } from '@/components/ArticleList'
import { HotArticles } from '@/components/HotArticles'
import { Categories } from '@/components/Categories'
import style from './index.module.scss'

interface IHomeProps {
  articles: any[];
  total: number
}

const pageSize = 12

const Home: NextPage<IHomeProps> = (props) => {
  const {
    articles: defaultArticles = [
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '1',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '2',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '3',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '4',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '5',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '6',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '7',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '8',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
      {
        title: '第一篇文章',
        cover: 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65185cff6eb14464926e53cf7c2b92e9~tplv-k3u1fbpfcp-zoom-1.image',
        id: '9',
        summary: '我的第一篇文章',
        category: {label: 'yi'},
        pubilcAt: '',
        views: 1112,
      },
    ],
    total = 0,
    categories = [],
    tags = []
  } = props as any
  const [affix, setAffix] = useState(false)
  const [page, setPage] = useState(1)
  const [articles, setArticles] = useState<[]>(defaultArticles)
  const [searchObj, setSearchObj] = useState({})

  // useEffect(() => {
  //   const handler = () => {
  //     const y = (window as any).scrollY
  //     setAffix(y > 100)
  //   }

  //   doc
  // }, [])

  useEffect(() => {
    console.log('setArticles');
    setArticles(defaultArticles)
  }, [searchObj])

  const getArticles = useCallback((page) => {
    // 接口获取
    console.log('getArticles');
    
  }, [searchObj])

  // 搜索输入变更 -> 获取文章列表
  const onSearchChange = (value) => {
    console.log('onchange',value);
    setSearchObj({comment: value})
  }

  // 按分类 -> 获取文章列表
  const onSearchCategory = () => {

  }


  return (
    <Frontend onSearchChange={onSearchChange}>
      <div className={style.wrapper}>
        <ArticleList articles={articles}></ArticleList>
        <aside className={style.aside}>
          <HotArticles />
          <Categories searchByCategory={onSearchCategory} />
        </aside>
      </div>
    </Frontend>
  )
}

export default Home
