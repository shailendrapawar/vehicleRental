import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate= useNavigate();

  return (
    <div className="flex justify-center items-center h-full">
      <button onClick={()=>navigate("/login")} 
        className="bg-green-400 w-20 h-10 rounded-xl"
        >Explore</button>
    </div>
  )
}
export default Landing