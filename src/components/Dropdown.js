import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

export default function PlaylistPicker({ items, onChange, placeholder }) {
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (!items) return null
    const nextItems = items.map((item) => ({
      label: item.name,
      uri: item.id,
    }))
    setOptions(nextItems)

    return () => {}
  }, [items])

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      defaultOption={options[0]?.label}
      width="200px"
    />
  )
}

PlaylistPicker.propTypes = {
  items: PropTypes.arrayOf({}).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

PlaylistPicker.defaultProps = {
  placeholder: '',
}
