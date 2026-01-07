import multer from "multer";

//usar memorystorage pra manter o arquivo em memoria e enviar diretamente poara o cloudinary...
export default {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4*1024*1024 //4MB
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error("Formato de arquivo inválido"))
        }
    }
}