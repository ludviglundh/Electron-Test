import React, { useEffect, useState } from 'react'
import Loading from './Loading'

export default function Apploader({ children }) {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return !isLoading && children
}
