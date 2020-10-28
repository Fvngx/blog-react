import React, { useState, useEffect, useCallback } from 'react'
import { message } from 'antd'
import { NextPage } from 'next'
import Head from 'next/head'
import { MDEditor } from '@/components/MDEditor'


const Editor: NextPage = () => {
  const [id, setId] = useState(null)
  const [article, setArticle] = useState<any>({})

  const save = useCallback(() => {

    console.log('文章：', article);
    
    if (!article.title) {
      message.warn('至少输入文章标题')
      return
    }

    article.status = 'draft'

    if (Array.isArray(article.tags)) {
      try {
        article.tags = article.tags.map(t => t.id).join(',')
      } catch (e) {
        console.log(e);
      }
    }

    if (id) {
      // return 
    }
  }, [article, id])

  return (
    <div>
      <Head>
        <title>{'新建文章'}</title>
      </Head>
      <div>
        <article>
          <MDEditor value={article.content} onChange={(value) => {
            setArticle(article => {              
              article.content = value
              console.log(article)
              return article
            })
          }} />
        </article>
      </div>
    </div>
  )
}

export default Editor