import React from 'react'
import App from 'next/app'
import { NProgress } from '@/components/NProgress'
import '@/theme/antd.less'
import '@/theme/reset.scss'
import '@/theme/markdown.scss'
// import 'viewerjs/dist/viewer.css'

class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props

    return (
      <div>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: ` * {
              transition: none !important;
            }`,
          }}
        ></style>
        <NProgress color={'#0188fb'} />
        <Component {...pageProps} />
      </div>
    )
  }
}

export default MyApp
