import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";

const InputBox = (props) => {
 
  const [passwordToggle, setPasswordToggle] = useState(false);
  const { size = "h-full w-full",
    color,
    backgroundColor,
    placeholder, type = "text",
    value, onChange,
    icon,
    name,
    shadow, border,required } = props

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
        type={passwordToggle?"text":type}
        value={value}
        onChange={onChange}
        name={name}
        required
      />

      {type == "password" && (<span className='grid  place-content-center w-5'
      onClick={()=>setPasswordToggle(!passwordToggle)}
      >
        {passwordToggle==true?<LiaEyeSolid/>:<LiaEyeSlashSolid />}

      </span>)}

    </main>
  )
}
export default InputBox