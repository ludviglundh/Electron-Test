import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { COLORS } from '../utils/colorUtils'

export default function PlaylistPicker({ items, onChange, placeholder }) {
  const [options, setOptions] = useState([])

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: `1px dotted ${COLORS.spotify}`,
      color: state.isSelected ? COLORS.spotify : COLORS.black,
    }),
  }

  useEffect(() => {
    if (!items) return null
    const nextItems = items.map((item) => ({
      label: item.name,
      value: item.id,
    }))
    setOptions(nextItems)

    return () => {}
  }, [items])

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
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
