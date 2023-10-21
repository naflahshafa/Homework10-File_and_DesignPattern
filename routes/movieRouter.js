const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../middleware/multer');


// Menampilkan daftar film
router.get('/paginate/:page', movieController.getAllMovies);

// Menampilkan detail film berdasarkan ID
router.get('/:id', movieController.getMovieById);

// Menambah film baru
router.post('/', upload.single('photo') ,movieController.addMovie);

// Menghapus 1 film
router.delete('/:id', movieController.deleteMovie);

// Mengedit informasi film
router.put('/:id', upload.single('photo') ,movieController.updateMovie);

// Rute menambah/upload gambar ke kolom photo
router.put('/upload/:id', upload.single('photo'), movieController.updatePhotoMovie);


module.exports = router;