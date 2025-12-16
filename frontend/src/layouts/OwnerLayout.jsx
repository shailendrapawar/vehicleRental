import { useSelector } from "react-redux"
import {Outlet} from "react-router"
const OwnerLayout = ({childern}) => {

    const { currentTheme } = useSelector(s => s.theme);
    // console.log("Current theme in owner layout:", currentTheme);
  return (
    <div style={{backgroundColor:currentTheme.background}}>
      OwnerLayout</div>
  )
}
export default OwnerLayout 