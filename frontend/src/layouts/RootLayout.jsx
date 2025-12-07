import { useSelector } from "react-redux"

const RootLayout = () => {
  const { currentTheme } = useSelector(s => s.theme);

  return (
    <main className={`h-screen w-full`}
      style={{ backgroundColor: currentTheme.background, color: currentTheme.textPrimary }}
    >
      Root layout
    </main>
  )
}
export default RootLayout 