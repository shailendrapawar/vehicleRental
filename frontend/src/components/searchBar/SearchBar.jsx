import { useSelector } from "react-redux"
import { RxCross2 } from "react-icons/rx";


const SearchBar = (props) => {
  const { placeholder, query, setQuery, setQueryResult } = props
  const { currentTheme } = useSelector(s => s.theme)

  // console.log(query)
  return (
    <div className="w-full h-full max-w-80  rounded-md overflow-hidden flex items-center relative">
      <input
        style={{
          backgroundColor: currentTheme.border,
          border: `1px solid ${currentTheme.border}`,
          // boxShadow:`2px 2px 5px ${currentTheme.border}`
        }}
        placeholder={placeholder || "Search"}
        className="w-full h-full text-sm px-2 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      >

      </input>
      {query.length > 0 && (<RxCross2 className="h-5 w-5 text-black absolute right-2"
        onClick={() => setQuery("")}
      />)}
    </div>
  )
}
export default SearchBar 