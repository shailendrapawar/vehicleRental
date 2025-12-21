
import { useRef, useState } from "react";
import { useSelector } from "react-redux"

const OtpModal = ({ size, backgroundColor, border }) => {
    const { currentTheme } = useSelector(s => s.theme)

    if (!size) return

    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputsRef = useRef([]);

    return (
        <div className={` ${size} bg-blue-500`}
            style={{
                backgroundColor: backgroundColor,
                border: border
            }}
        >



        </div>
    )
}
export default OtpModal