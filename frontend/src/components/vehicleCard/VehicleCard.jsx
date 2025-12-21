import { useSelector } from "react-redux"

const VehicleCard = () => {

  const { currentTheme } = useSelector(s => s.theme)
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
        >status </span>
      </section>

      <section className="h-[40%] w-full px-2 pb-2 flex flex-col justify-between gap- ">
        <span className=" flex justify-between">
          <h3>title of vehicle</h3>
          <span className="w-auto px-4 rounded-full text-white font-semibold " style={{
            backgroundColor: currentTheme.secondary
          }}>$900</span>
        </span>

        <div className="grid grid-cols-2 h-[40%] text-xs px-2 relative items-center place-content-center gap-1"
          style={{
            color: currentTheme.textSecondary
          }}
        >
          <span>Type: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>Scooty</b></span>
          <span>Mileage: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>24 km/l</b></span>
          <span>Fuel Type: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>Petrol</b></span>
          <span>Transmission: <b className="font-semibold" style={{ color: currentTheme.textPrimary }}>Manual</b></span>
        </div>

        <span className="flex justify-end h-10">
          <button className="h-full w-full rounded-md cursor-pointer text-white font-semibold hover:opacity-90"
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