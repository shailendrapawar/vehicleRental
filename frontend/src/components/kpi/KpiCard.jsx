const KpiCard = ({size,title,data,unit}) => {
  return (
    <div className={`bg-red-500 ${size} rounded-md flex items-center justify-center`}>
      <span>{title}</span>
      <span>{data} {unit}</span>
    </div>
  )
}
export default KpiCard