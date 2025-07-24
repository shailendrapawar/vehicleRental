import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

const OtpBar = ({ size, length = 4,  setParentOtp }) => {
    const numberRegex = /^[0-9]?$/;

    const { currentTheme } = useSelector(s => s.theme)

    const [otp, setotp] = useState(new Array(length).fill(""))
    const inputRef = useRef([]);


    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!numberRegex.test(value)) return;
        if (index > inputRef?.current?.length - 1) return

        const tempOtp = [...otp];
        tempOtp[index] = value;
        setotp(tempOtp)

        // set parent otp here

        if (value && index < otp.length - 1) {
            inputRef?.current[index + 1]?.focus()
        }
    }


    const handleOnKeyDown = (e, index) => {
        const key = e.key;
        const value = e.target.value

        //return if already at index 0
        if (index == 0) return

        if (key === "Backspace" && value === "") {
            inputRef?.current[index - 1]?.focus()

        }
    }

    useEffect(() => {
        setParentOtp(otp.join(""))
    }, [otp])

    return (
        <div className={`${size}  rounded-md flex justify-evenly gap-1`}
        >
            {otp.map((v, index) => {
                return (
                    <input
                        type={"text"}
                        key={index}
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                        ref={(el) => { inputRef.current[index] = el }}
                        className=" w-10 h-10 rounded-md text-center"
                        style={{ backgroundColor: currentTheme.background, color: currentTheme.secondaryAccent, border: `1px solid ${currentTheme.border}` }}
                    ></input>
                )
            })}


        </div>
    )
}
export default OtpBar