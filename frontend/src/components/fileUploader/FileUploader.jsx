import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { MdAddPhotoAlternate } from "react-icons/md";

import { MdAddToPhotos } from "react-icons/md";
import toast from "react-hot-toast";

import { RxCross2 } from "react-icons/rx";

const FileUploader = ({ sizeClass = "w-[100%] h-[100%]", multiple, size, acceptType, files, setFiles }) => {
    const filesRef = useRef()

    const { currentTheme } = useSelector(s => s.theme)
    const [FILE_TYPES] = useState({
        image: "image/*",
    })

    const lastIconRef = useRef(null);

    const handleChange = (e) => {
        // console.log(filesRef)
        const tempFiles = e?.target?.files || null

        //second time-adding files
        if (files.length > 0 && tempFiles?.length) {
            if (!(tempFiles?.length <= (size - files?.length))) {
                toast.error("Upload limit reached.")
                return
            }
            setFiles((prev) => [...prev, ...tempFiles])
            // e.target.value = ""
            return
        }

        //first time- adding files
        if (tempFiles?.length && tempFiles?.length > size) {
            e.target.value = ""
            toast.error(`You can only select upto ${size} files`)
            return
        }

        setFiles([...tempFiles])
        e.target.value = ""
    }

    const handleRemoveItem = (index) => {
        const filteredFile = files?.filter((file, i) => i != index)
        setFiles(filteredFile)
    }

    useEffect(() => {

        if (files.length > 0) {
            // console.log("scrolled displatch")
            lastIconRef?.current?.scrollIntoView({
                behavior: "smooth",
                inline: "end",
                block: "nearest",
            })
        }
    }, [files])

    return (
        <div className={`${sizeClass} rounded-md flex flex-col justify-center gap-5 items-center`}
            style={{
                border: `2px solid ${currentTheme.secondary}`
            }}
        >
            <input type="file" className="gstBill-input h-6 col-span-2  text-xs hidden"
                ref={filesRef}
                onChange={(e) => handleChange(e)}
                multiple={multiple}
                size={size}
                accept={`${FILE_TYPES[acceptType]}`}
            ></input>

            {files && files?.length > 0 ? (<div className="h-[50%] w-full flex overflow-x-scroll gap-2 hide-scrollbar px-2">

                {files?.map((file, i) => {
                    const objectUrl = URL.createObjectURL(file)
                    return <span key={i} className="h-full min-w-30 w-30 rounded-md relative">

                        <span title="remove"
                            className="w-5 h-5 p-0.5 rounded-full bg-white absolute right-2 top-2 flex justify-center items-center cursor-pointer"
                            style={{border:`2px solid ${currentTheme.border}`}}
                            >
                            <RxCross2 onClick={()=>handleRemoveItem(i)} />
                        </span>
                        <img src={objectUrl} className="h-full w-full object-cover "
                            style={{
                                border: `1px solid ${currentTheme.border}`,
                                boxShadow: `2px 2px 5px ${currentTheme.border}`
                            }}
                        >
                        </img>
                    </span>
                })}

                {files?.length!=size &&(<span ref={lastIconRef} className="h-full min-w-30 w-30 flex items-center justify-center bg-gray-500 rounded-md"
                    onClick={(e) => filesRef?.current?.click()}
                >
                    <MdAddToPhotos className="h-10 w-10" />
                </span>)}

            </div>) : (<span className="flex flex-col items-center justify-center cursor-pointer"
                onClick={(e) => filesRef?.current?.click()}
            >
                <MdAddPhotoAlternate className="h-15 w-15" style={{ color: currentTheme.secondary }} />
                <h3 style={{ color: currentTheme.textSecondary }}>Add Shop Images</h3>
            </span>)}

            <span className="text-xs" style={{
                color: currentTheme.textSecondary
            }}>Selected:{files?.length}/{size} files</span>

        </div>
    )
}
export default FileUploader