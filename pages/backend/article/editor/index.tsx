import React, { useState, useEffect, useCallback } from 'react'
import { message, PageHeader, Input, Popover, Button, Modal, Image, Tag } from 'antd'
import { NextPage } from 'next'
import Head from 'next/head'
import { MDEditor } from '@/components/MDEditor'
import { FileSelectDrawer } from '@/components/FileSelectDrawer'
import { TagsSelect } from '@/components/TagsSelect'
import style from './index.module.scss'


interface IProps {
  onCancel?: () => void
  onPreview?: () => void
  onOK?: (any) => void
}

const Publish: React.FC<IProps> = ({onCancel, onPreview, onOK}) => {
  const [categorys, setCategorys] = useState<any>([])
  const [tags, setTags] = useState<any>([])
  useEffect(() => {
    const allTag = sessionStorage.getItem('tags')||[{title:'12'},{title:'333'}]
    const allCategory = sessionStorage.getItem('category')||[{title:'12'},{title:'333'}]
    setCategorys(allCategory)
    setTags(allTag)
  }, [])

  const handleCategory = (category) => {
    console.log(category);
    // setSelectCategory(nextSelect)
  }
  const addCategory = (category) => {
    const datas = [...categorys, category]
    setCategorys(datas)
  }

  const handleTag = (tag) => {
    console.log(tag)
    // setSelectTag(nextSelect)
  }

  const addTag = (tag) => {
    const datas = [...tags, tag]
    setTags(datas)
  }

  return (
    <div style={{width: 260,minHeight:200}}>
      <div style={{fontSize:18,fontWeight:600,color:'#777',lineHeight:2}}>发布文章</div>
      <TagsSelect title="分类" showAdd={true} data={categorys} onChange={handleCategory} onAdd={addCategory} />
      <TagsSelect title="标签" showAdd={true} data={tags} checkBox={true} onChange={handleTag} onAdd={addTag} />
    </div>
  )
}

const CoverImg: React.FC<IProps> = ({onCancel, onOK}) => {
  const [image, setImage] = useState('')
  const onClickOK = () => {
    onOK(image)
  }
  return (
    <div>
      <Input
        placeholder="输入封面链接"
        onChange={e => {
          const value = e.target.value
          setImage(value)
        }}
      />
      <div style={{height:260,width:260,marginTop:10}}>
        {
          image ? (<Image height={260} src={image} />) : (
            <div style={{paddingTop: 100, color: '#999', width: '100%', textAlign: 'center'}}>图片预览</div>
          )
        }
      </div>
      <div style={{display:"flex",marginTop:10,justifyContent: 'flex-end'}}>
        <Button style={{marginRight:20}} onClick={onCancel}>取消</Button>
        <Button disabled={!image} type="primary" onClick={onClickOK}>确认</Button>
      </div>
    </div>
  )
}


const Editor: NextPage = () => {
  const [id, setId] = useState(null)
  const [fileDrawerVisible, setFileDrawerVisible] = useState(false);
  const [article, setArticle] = useState<any>({})
  const [coverPop, setCoverPop] = useState(false)
  const [publishPop, setPublishPop] = useState(false)

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
              key={1}
              onClick={() => {
                setFileDrawerVisible(true);
              }}
            >文件库</Button>,
            // <Button onClick={save}>保存草稿</Button>,
            <Popover
              key={2}
              visible={coverPop}
              content={<CoverImg onCancel={() => {setCoverPop(false)}} onOK={(img)=>{
                setArticle(article => {
                  article.cover = img
                  return article
                })
                setCoverPop(false)
              }} />}
              trigger="click"
              onVisibleChange={visiable => {setCoverPop(visiable)}}
            >
              <Button type="dashed">封面</Button>
            </Popover>,
            <Popover key={3} placement="bottomRight" content={<Publish />} trigger="click">
              <Button type="primary">保存Or发布</Button>
            </Popover>,
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