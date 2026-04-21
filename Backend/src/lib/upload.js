import multer from 'multer';

// Configure multer storage (in-memory)
const storage=multer.memoryStorage();

// File filter to allow only PDF and Word documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF or Word files are allowed"), false);
  }
};

console.log("Multer checking file types: ", fileFilter);
// create multer instance
export const upload=multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})