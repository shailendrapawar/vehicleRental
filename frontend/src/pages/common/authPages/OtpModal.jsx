
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { IoArrowBackCircle } from "react-icons/io5";

const OtpModal = (props) => {
    const { size, backgroundColor, border, shadow,toggleFunction, verifyOtp, resendOtp } = props
    const { currentTheme } = useSelector(s => s.theme)

    if (!size) return

    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputsRef = useRef([]);


    const handleChange = (value = value.trim(), index) => {
        //for single value pass
        if (!/^\d?$/.test(value)) return;

        const tempOtp = [...otp];
        tempOtp[index] = value;

        //set Otp
        setOtp(tempOtp)

        if (value && index < 6) {
            inputsRef?.current[index + 1]?.focus()
        }

    }

    const handleBackSpace = (e, index) => {
        // console.log(e)
        if (e.key == "Backspace" && index > 0) {
            otp[index] = ""
            inputsRef?.current[index - 1]?.focus()
        }
    }




    useEffect(() => {
        if (inputsRef.current.length) {
            inputsRef?.current[0]?.focus()
        }
    }, [])

    return (
        <div className={`${size} flex flex-col justify-center items-center rounded-md relative`}
            // style={{
            //     backgroundColor: backgroundColor,
            //     border: border,
            //     boxShadow: shadow
            // }}
        >

            <IoArrowBackCircle className="h-8 w-8 text-black absolute top-2 left-2 cursor-pointer active:opacity-50"
            onClick={()=>toggleFunction(false)}
            />
            <section
                className=" flex justify-center absolute top-15 gap-2"
            >
                {otp.map((digit, index) => {
                    return <input className=" text-center rounded-md h-10 w-10"
                        style={{ backgroundColor: currentTheme.border, outlineColor: currentTheme.primary }}
                        key={index}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleBackSpace(e, index)}
                        ref={(el) => inputsRef.current[index] = el}
                        value={digit}
                    >

                    </input>
                })}
            </section>

            <button className="text-white active:opacity-50 h-10 w-25 rounded-md cursor-pointer absolute top-35"
                style={{
                    backgroundColor: currentTheme.primary,
                }}
                onClick={(e)=>{
                    // setOtp(Array(6).fill(""))
                    verifyOtp(otp.join(""))
                }}
            >
                Verify
            </button>

            <span className="absolute bottom-5 text-sm" style={{color:currentTheme.textSecondary}}>Didn't recived code? 
                <span className="underline active:opacity-50 cursor-pointer" style={{color: currentTheme.secondary,}} 
                onClick={resendOtp}
                >Resend</span>
            </span>


        </div>
    )
}
export default OtpModal