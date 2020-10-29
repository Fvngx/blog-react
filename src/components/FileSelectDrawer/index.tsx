import React, { useState, useCallback, useRef } from 'react'
import { Alert, Drawer, Card, List, message } from 'antd'

const { Meta } = Card

interface IFileProps {
  isCopy?: boolean
  visible: boolean
  closeAfterClick?: boolean
  onClose: () => void
  onChange?: (arg: any) => void
}

const copy = value => {
  let textarea: any = document.createElement('textarea')
  textarea.id = 't'
  textarea.style.height = 0
  document.body.appendChild(textarea)
  textarea.value = value
  let selector: any = document.querySelector('#t')
  selector.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  message.success('连接复制成功')
}

export const FileSelectDrawer: React.FC<IFileProps> = ({
  visible,
  isCopy = false,
  closeAfterClick = false,
  onClose,
  onChange,
}) => {
  const ref = useRef()
  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState([])
  const [params, setParams] = useState(null)

  const getFiles = useCallback(() => {
    // return
  }, [])

  return (
    <Drawer
      width={786}
      placement="right"
      title={'文件选择'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {isCopy && (
        <div style={{ marginBottom: 24 }}>
          <Alert message="点击卡片复制连接，点击图片查看大图" type="info" />
        </div>
      )}
      <div ref={ref}></div>
    </Drawer>
  )
}