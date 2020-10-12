import React, { useState, useEffect, useCallback, useRef } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { Frontend } from '@/layout/Frontend'

const Article: NextPage = (props) => {
  const { setting={}, article } = props as any
  const ref = useRef(null)

  return (
    <Frontend>
      <div>ioewsd</div>
    </Frontend>
  )
}

export default Article