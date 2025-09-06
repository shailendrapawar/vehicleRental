import { useSelector } from "react-redux"

const KpiCard = ({data,size,icon}) => {

      const { currentTheme } = useSelector(s => s.theme)

  return (
    <div className={`${size} w-full rounded-lg relative flex justify-center items-center`}
    style={{backgroundColor:currentTheme.cardBackground}}
    >

        <section className="flex absolute top-2 px-5 w-full justify-between items-center">
            <h3 className="text-lg">{data.heading}</h3>
            <span>{icon}</span>
        </section>

        <span className=" text-3xl font-bold"
        >{data.number}</span>

    </div>
  )
}
export default KpiCard