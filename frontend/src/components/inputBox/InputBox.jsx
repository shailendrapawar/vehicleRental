import React from 'react'
import { useSelector } from 'react-redux'

const InputBox = (props) => {
  // console.log(props)
  const { size = "h-full w-full",
    color,
    backgroundColor,
    placeholder, type = "text",
    value, onChange,
    icon,
    shadow, border } = props
 
  const { currentTheme } = useSelector(s => s.theme);

  return (
    <main className={`${size} rounded-md flex px-1`}
      style={{
        color: color || currentTheme.textPrimary,
        backgroundColor: backgroundColor || currentTheme.cardBackground,
        boxShadow: shadow,
        border
      }}

    >
      {icon && value != "" && <span className={`p-1 flex items-center`}>
        {icon}
      </span>}

      <input
        className={"h-full w-full px-1 outline-none"}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />

    </main>
  )
}
export default InputBox