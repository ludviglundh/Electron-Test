import React, { useEffect, useState } from 'react'
import Loading from './Loading'

export default function Apploader({ children }) {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return !isLoading && children
}
