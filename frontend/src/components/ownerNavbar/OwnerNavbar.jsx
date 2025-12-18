import { useSelector } from "react-redux"

import { OwnerNavs } from "../../routes/OwnerRoutes"
import { NavLink } from "react-router"

import { FaUserCircle } from "react-icons/fa";


const OwnerNavbar = () => {

    const { currentTheme } = useSelector(s => s.theme)

    return (
        <nav className="min-w-20 w-20 h-full rounded-md flex flex-col justify-center items-center relative"
            style={{
                backgroundColor: currentTheme.primary,
                boxShadow: `2px 2px 5px ${currentTheme.border}`,
            }}
        >
            <span className="absolute top-5">
                <FaUserCircle className="text-white text-4xl mb-6 mt-2" />
            </span>

            <section className=" flex flex-col gap-2">
                {OwnerNavs.map(({ icon, path, title }, index) => (
                    <NavLink to={path}
                        key={index}
                        // title={`${title}`}
                        className={({ isActive }) => ` flex flex-col items-center  justify-center px-3 py-3 cursor-pointer transition-all ease-in-out `}
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? currentTheme.cardBackground+'40' : currentTheme.primary,
                            borderRadius: isActive ? '8px' : '0px',
                        })}
                    >
                        <span 
                            className={` hover:scale-110 active:90`}
                        >
                            {icon}
                        </span>

                        <span className="text-[8px] text-white">{title}</span>
                    </NavLink>
                ))}
            </section>


            {/* <span className="absolute top-5">
                <FaUserCircle className="text-white text-4xl mb-6 mt-2" />
            </span> */}
        </nav>
    )
}
export default OwnerNavbar