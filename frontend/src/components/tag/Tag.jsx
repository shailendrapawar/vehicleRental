const Tag = ({name}) => {
  return (
    <div className="h-6 sm:h-8 w-15 sm:w-22 rounded-full bg-green-500 text-white flex justify-center items-center text-xs sm:text-lg">
      {name?.toUpperCase()}
    </div>
  )
}
export default Tag