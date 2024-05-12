import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from '../utils/error.handler.js'

const fileUpload = () => {
    const storage = multer.diskStorage({
        // destination: (req, file, cb) => {
        //     cb(null, 'uploads/');
        // },
        // filename: (req, file, cb) => {
        //     if (file) {
        //         cb(null, uuidv4() + "_" + file.originalname);
        //     } else {
        //         cb(null, false);
        //     }
        // }
    });

    const fileFilter = (req, file, cb) => {
        if (!file.mimetype.startsWith('image')) 
            return cb(new AppError('Only images are allowed', 400), false);
            cb(null, true);
        
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 1024 * 1024 * 10 } // 10 MB file size limit
    });
};

export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);
export const uploadArrayFile = (fieldName) => fileUpload().array(fieldName, 10);
export const uploadFields = (fields) => fileUpload().fields(fields);
