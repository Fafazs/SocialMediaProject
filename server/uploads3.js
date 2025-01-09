const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure Multer for S3 uploads
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME, // Your S3 bucket name
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
        },
    }),
});

exports.module = upload;