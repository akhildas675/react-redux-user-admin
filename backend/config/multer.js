import multer from 'multer';

// Use memory storage for Multer
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
