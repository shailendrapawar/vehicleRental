import { useSelector } from "react-redux"

const VehicleCard = ({ data }) => {
  const { } = data
  const { currentTheme } = useSelector(s => s.theme)
  console.log(data)
  return (
    <div className="w-80 h-80  rounded-md relative cursor-pointer"
      style={{
        backgroundColor: currentTheme.cardBackground,
        boxShadow: `2px 2px 5px ${currentTheme.border}`,
        border: `1px solid ${currentTheme.border}`

      }}
    >

      <section className="h-[60%] w-full  p-2 rounded-[10px] relative">
        <img className=" w-full h-full bg-red-500 rounded-[8px]">

        </img>
        <span className="absolute top-5 left-5 px-4 rounded-full text-xs py-1"
          style={{ backgroundColor: currentTheme.background }}
        >{data?.operationalStatus} </span>
      </section>

      <section className="h-[40%] w-full px-2 pb-2 flex flex-col justify-between gap-2 ">
        <span className=" flex justify-between">
          <h3 className="font-semibold">{data.model?.toUpperCase()} . <span className="text-xs" style={{color:currentTheme.textSecondary}}>{data.brand.toUpperCase()}</span></h3>
          <span className="w-auto px-3 py-0.5 flex justify-center items-center rounded-full text-white font-semibold  text-xs" style={{
            backgroundColor: currentTheme.secondary
          }}>₹ {data?.meta?.currentPrice||100}</span>
        </span>

        <div className="grid grid-cols-2 h-[40%] text-xs px-2 relative items-center place-content-center gap-1"
          style={{
            color: currentTheme.textSecondary
          }}
        >
          <span>Type: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>{data?.vehicleType}</b></span>
          <span>Mileage: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>{data?.mileage} km/l</b></span>
          <span>Fuel Type: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>{data?.fuelType}</b></span>
          <span>Transmission: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>{data?.transmission}</b></span>
        </div>

        <span className="flex justify-end h-8">
          <button className="h-full w-full rounded-md cursor-pointer text-white text-sm font-semibold hover:opacity-90"
            style={{
              backgroundColor: currentTheme.primary,
            }}
          >Book</button>
        </span>
      </section>

    </div>
  )
}
export default VehicleCard