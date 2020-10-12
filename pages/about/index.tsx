import React, { useState, useEffect, useCallback, useRef } from 'react'
import Head from 'next/head'
import { NextPage } from 'next'
import Link from 'next/link'
import { Frontend } from '@/layout/Frontend'

const About: NextPage = (props) => {
  const ref = useRef(null)

  return (
    <Frontend>
      <div>about</div>
    </Frontend>
  )
}

export default About