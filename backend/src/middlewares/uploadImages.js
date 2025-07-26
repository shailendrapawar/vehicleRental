import multer from "multer"

const allowedTypes=['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,`${file.originalname}`)
    }
});



const uploadImages=multer({
    storage,
    limits:{files:5},
    fileFilter:(req,file,cb)=>{
        if(allowedTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
             cb(new Error('Only JPEG, PNG, JPG, and WEBP images are allowed.'));
        }
    }
})

export default uploadImages;