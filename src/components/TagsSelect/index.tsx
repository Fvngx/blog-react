import React, { useState, useEffect } from 'react'
import { Tag, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


const { CheckableTag } = Tag

interface IProps {
  title: string
  checkBox?: boolean
  data: any[]
  showAdd: boolean
  onChange: (any) => void
  onAdd?: (any) => void
}

export const TagsSelect: React.FC<IProps> = ({title ='',checkBox=false, showAdd=false, data=[], onChange, onAdd}) => {
  const [tags, setTags] = useState<any>([])
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState(null)

  const handleTag = (tag, checked) => {
    let nextSelect
    if (checkBox) {
      nextSelect = checked ? [...tags, tag] : tags.filter(t => t.title !== tag.title)
    } else {
      nextSelect = checked ? [tag] : []
    }
    setTags(nextSelect)
    onChange(nextSelect)
  }

  const handleInputChange = e => {
    const value = e.target.value
    setInputValue(value)
  }

  const handleInputConfirm = () => {
    const index = data.findIndex(t => {
      console.log(t.title , inputValue)
      
      return t.title === inputValue
    })
    if (index > -1) {
      message.warn(`已存在名为${inputValue}的${title}`)
      return
    }
    if (inputValue) {
      onAdd({title: inputValue})
      setInputVisible(false)
      setInputValue(null)
    }
  }

  return (
    <div style={{color:'#999', lineHeight:2}}>
      <div style={{fontSize:16}}>{title}</div>
        {data.map(d=> {
          return(
            <CheckableTag
              key={d.title}
              checked={tags.findIndex(t => t.title === d.title) > -1}
              onChange={checked => handleTag(d, checked)}
              style={{border: '1px solid #eee'}}
            >
              {d.title}
            </CheckableTag>)
        })}
        {showAdd ? (
          inputVisible ? (
            <Input
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
              autoFocus={true}
            />
          ) : (
            <Tag onClick={() => {setInputVisible(true)}} className="site-tag-plus">
              <PlusOutlined /> New Tag
            </Tag>
          )
        ): (null)}
    </div>
  )
}