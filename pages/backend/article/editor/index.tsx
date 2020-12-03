import React, { useState, useEffect, useCallback } from 'react'
import { message, PageHeader, Input, Popover, Button, Modal, Image, Tag } from 'antd'
import { NextPage } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { MDEditor } from '@/components/MDEditor'
import { FileSelectDrawer } from '@/components/FileSelectDrawer'
import { TagsSelect } from '@/components/TagsSelect'
import { ArticleProvider } from '@/providers/article'
import style from './index.module.scss'


interface IProps {
  onCancel?: () => void
  onPreview?: () => void
  onOK?: (any) => void
  onChange?: (any) => void
  visiable?: boolean
}

const Publish: React.FC<IProps> = ({onPreview, onOK, onChange, visiable}) => {
  const [categorys, setCategorys] = useState<any>([])
  const [tags, setTags] = useState<any>([])
  useEffect(() => {
    const allTag = sessionStorage.getItem('tags')||[]
    const allCategory = sessionStorage.getItem('category')||[]
    setCategorys(allCategory)
    setTags(allTag)
  }, [])

  const handleCategory = useCallback((category) => {
    console.log(category);
    onChange({type: 'category', category})
  },[])
  const addCategory = useCallback((category) => {
    const datas = [...categorys, category]
    setCategorys(datas)
  }, [])

  const handleTag = useCallback((tag) => {
    console.log(tag)
    onChange({type: 'tag', tag})
  }, [])

  const addTag = (tag) => {
    const datas = [...tags, tag]
    setTags(datas)
    console.log(tag, datas);
  }

  return (
    <div style={{width: 260,minHeight:200,paddingBottom:10}}>
      <div style={{fontSize:18,fontWeight:600,color:'#777',lineHeight:2}}>发布文章</div>
      <TagsSelect title="分类" data={categorys} onChange={handleCategory} onAdd={addCategory} />
      <TagsSelect title="标签" showAdd={true} data={tags} checkBox={true} onChange={handleTag} onAdd={addTag} visialbe={visiable} />
      <div style={{marginTop:40,display:'flex',justifyContent:'center'}}>
        <Button type="ghost" style={{marginRight:30}} onClick={onPreview}>预览</Button>
        <Button type="primary" onClick={onOK}>发布</Button>
      </div>
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

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (!token) {
      Router.push('/backend/login')
    }
  }, [])

  const onChange = useCallback(res => {
    if (res.type === 'category') {
      
    } else if (res.type === 'tag') {

    }
  }, [])

  const save = useCallback(() => {
    // console.log('文章：', article, id);
    if (!article.title) {
      message.warn('至少输入文章标题')
      return
    }

    if (!article.status) {
      article.status = 'draft'
    }

    if (Array.isArray(article.tags)) {
      try {
        article.tags = article.tags.map(t => t.id).join(',')
      } catch (e) {
        console.log(e);
      }
    }

    if (id) {
      return ArticleProvider.updateArticle(id, article).then(res => {
        // setId(res.id)
        message.success('文章保存成功')
      })
    } else {
      return ArticleProvider.addArticle(article).then(res => {
        setId(res.id)
        message.success('文章保存成功')
      })
    }
  }, [article, id])

  const preview = useCallback(() => {
    // console.log(id);
    
    if (id) {
      window.open('/article/' + id)
    } else {
      message.warn('请先保存')
    }
  },[id])

  const publish = useCallback(() => {
    let canPublish = true
    void [
      ['title', '请输入文章标题'],
      ['content', '请输入文章内容']
    ].forEach(([key, msg]) => {
      if (!article[key]) {
        message.warn(msg)
        canPublish = false
      }
    })
    if (!canPublish) return

    const data = Object.assign({}, article, {status: 'publish'})
    const handle = res => {
      if (res.id) {
        setId(res.id)
      }
      message.success('文章发布成功')
    }
    // console.log(id)
    
    if (id) {
      ArticleProvider.updateArticle(id, data).then(handle)
    } else {
      ArticleProvider.addArticle(data).then(handle)
    }
  },[])

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
              onClick={save}
            >保存</Button>,
            <Button 
              type="dashed"
              key={2}
              onClick={() => {
                setFileDrawerVisible(true);
              }}
            >文件库</Button>,
            // <Button onClick={save}>保存草稿</Button>,
            <Popover
              key={3}
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
            <Popover
              visible={publishPop}
              key={4}
              placement="bottomRight"
              content={<Publish visiable={publishPop} onPreview={preview} onChange={onChange} onOK={publish} />}
              onVisibleChange={visiable => {setPublishPop(visiable)}}
              trigger="click"
            >
              <Button type="primary">发布</Button>
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