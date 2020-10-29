import React, { useState, useEffect, useRef } from 'react'
import { Spin } from 'antd'
import cls from 'classnames'
import style from './index.module.scss'

interface IProps {
  value: string
  onChange: (arg: any) => void
}

let monacoInstance = null;

export const MDEditor: React.FC<IProps> = ({ value='', onChange }) => {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      return
    }

    if (monacoInstance) {
      monacoInstance.setValue(value)
    }
  }, [mounted, value])

  useEffect(() => {
    Promise.all([import('monaco-editor/esm/vs/editor/editor.api')]).then(
      res => {
        monacoInstance = res[0].editor.create(ref.current, {
          value: value,
          language: 'markdown',
          automaticLayout: true,
          theme: 'vs',
          fontSize: 22,
          minimap: {
            enabled: true,
          },
          scrollBeyondLastLine: false,
        })
        monacoInstance.onDidChangeModelContent(() => {
          const content = monacoInstance.getValue()
          console.log(content)
          onChange(content)
        })
      }
    )
    setMounted(true)

    return () => {
      setMounted(false)
      monacoInstance.dispose()
      monacoInstance = null
    }
  }, [])

  return (
    <Spin tip="编辑器努力加载中..." spinning={!mounted}>
      <div className={cls(style.wrapper)} ref={ref}></div>
    </Spin>
  )
}
