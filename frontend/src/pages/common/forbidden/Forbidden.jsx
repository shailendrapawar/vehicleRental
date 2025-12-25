import { useNavigate } from "react-router";
// import { Link } from "react-router;

const Forbidden = () => {
    const navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-7xl font-bold text-red-500">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Access Forbidden</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        You don’t have permission to access this page.
      </p>

      <div className="flex gap-4 mt-6">
        <button onClick={()=>navigate(-1)}>Back</button>
      </div>
    </div>
  );
}
export default Forbidden