import { Link, useLocation, useNavigate } from "react-router";

const ResourceNotFound = ({}) => {
  const navigate=useNavigate()
  const {state}=useLocation();
  // console.log(state);

    return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">{state?.errorCode||400}</h1>
      <p className="mt-4 text-xl text-gray-600">
        {state?.title}
      </p>
      <p className="mt-2 text-gray-500">
        {state?.message}
       </p>
 
      <button
        // to="/"
        onClick={()=>navigate(state?.path||-1)}
        className="mt-6 px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        {state?.buttonTitle||"Go back"}
        </button>
    </div>
  );
  
}
export default ResourceNotFound