import { useSelector } from "react-redux"

const InputBox = ({ size, name, placeholder, value, onChange, required, type }) => {
  const { currentTheme } = useSelector(s => s.theme)
  return (
    <input
      className={`h-5  rounded-md ${size} p-2 text-xs outline-none`}
      value={value}
      type={type}
      onChange={(e) => onChange(e)}
      name={name}
      placeholder={placeholder}
      required={required}
      style={{ backgroundColor: currentTheme.background }}
    ></input>
  )
}
export default InputBox