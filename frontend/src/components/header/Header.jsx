import { useSelector } from "react-redux"

const Header = ({ title = "", action, actionIcon, actionTitle }) => {

  const { currentTheme } = useSelector(s => s.theme);

  return (
    <div className="w-full h-12  rounded-md flex gap-5 ">

      <section className="w-[80%] rounded-md flex items-center pl-2"
        style={{
          backgroundColor: currentTheme.border
        }}
      >
        <h2 className="font-semibold text-lg"
          style={{}}
        >{title}</h2>
      </section>


      {action && (<button className="w-[50%] md:w-[20%] lg:w-[20%] rounded-md text-white text-md cursor-pointer transition-all ease-out
       flex items-center justify-center gap-2 hover:opacity-90"
        style={{
          backgroundColor: currentTheme.primary
        }}
      >
        {actionIcon} {actionTitle}</button>)}
    </div>
  )
}
export default Header