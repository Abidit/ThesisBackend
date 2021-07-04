const multer = require('multer');



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './Images')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },


})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            req.fileValidationError = 'Only image files are allowed!';
            cb(null, false);

        }
    }

});

module.exports = upload;