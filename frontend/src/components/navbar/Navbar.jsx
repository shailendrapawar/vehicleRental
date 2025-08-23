import { useSelector } from "react-redux"
import { CgMenuRight } from "react-icons/cg";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ routes }) => {
    const { currentTheme } = useSelector(s => s.theme);

    const [mobileNavToggler, setMobileNavToggler] = useState(false);
    // console.log(routes)

    return (
        <div className="h-12 w-full bg-red-300 rounded-full absolute top-5 flex items-center justify-center z-10 select-none px-2 "
            style={{ backgroundColor: currentTheme.cardBackground }}
        >

            <h1 className="absolute left-5">Rent-V</h1>

            <div className={`web-nav hidden md:flex gap-5`}>
                {routes?.map((v,i)=>{
                    return <NavLink 
                    
                    className={({isActive})=>`w-25 text-center border-b-2 ${isActive?"border-b-white":"border-b-transparent"}`}
                    to={v.path} key={i}>{v.name}</NavLink>
                })}

            </div>


            {mobileNavToggler && (<div className={`mobile-nav md:hidden absolute flex flex-col justify-evenly items-center  -bottom-35 w-[85%] h-35 rounded-br-4xl rounded-bl-4xl text-sm`}
                style={{ backgroundColor: currentTheme.cardBackground }}
            >
                {routes?.map((v,i)=>{
                    return <NavLink 
                    onClick={()=>setMobileNavToggler(false)}
                    className={({isActive})=>`w-20 text-center border-b-2 ${isActive?"border-b-white":"border-b-transparent"}`}
                    to={v.path} key={i}>{v.name}</NavLink>
                })}
            </div>)}



            <span className={`h-10 w-10 flex justify-center items-center absolute right-2`}
                onClick={() => { setMobileNavToggler(prev => !prev) }}
            >
                <CgMenuRight className={`h-full w-full transition-all md:hidden ease-out mr-2 ${mobileNavToggler ? "scale-80 " : "scale-100"}`} />
                <div className="h-full w-full hidden md:block rounded-full bg-yellow-200">

                </div>
            </span>

            

        </div>
    )
}
export default Navbar