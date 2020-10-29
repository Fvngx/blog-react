import React, { useState, useEffect, useCallback } from 'react'
import { message, PageHeader, Input, Button, Modal } from 'antd'
import { NextPage } from 'next'
import Head from 'next/head'
import { MDEditor } from '@/components/MDEditor'
import { FileSelectDrawer } from '@/components/FileSelectDrawer'
import style from './index.module.scss'


const Editor: NextPage = () => {
  const [id, setId] = useState(null)
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
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
    <div className={style.wrapper}>
      <Head>
        <title>{'新建文章'}</title>
      </Head>
      <header className={style.header}>
        <PageHeader
          style={{borderBottom: '1px solid rgb(235, 237, 240)'}}
          onBack={() => window.close()}
          backIcon={false}
          title={
            <Input
              style={{flex: 300}}
              placeholder="输入文章标题..."
              defaultValue={article.title}
              onChange={e => {
                const value = e.target.value
                setArticle(article => {
                  article.title = value
                  return article
                })
              }}
            />
          }
          extra={[
            <Button 
              type="dashed"
              onClick={() => {
                setFileDrawerVisible(true);
              }}
            >文件库</Button>,
            // <Button onClick={save}>保存草稿</Button>,
            <Button>封面</Button>,
            <Button type="primary">保存Or发布</Button>,
          ]}
        />
      </header>
      <Modal >
        <Input 
          placeholder="输入封面连接" 
          onChange={e => {
            const value = e.target.value
            setArticle(article => {
              article.cover = value
              return article
            })
          }} 
        />
      </Modal>
      <div className={style.content}>
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
      
      <FileSelectDrawer
        isCopy={true}
        closeAfterClick={true}
        visible={fileDrawerVisible}
        onClose={() => {
          setFileDrawerVisible(false)
        }}
      />
      
    </div>
  )
}

export default Editor