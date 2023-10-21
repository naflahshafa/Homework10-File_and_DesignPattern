const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../middleware/multer');

// router.get('/paginate/:page', movieController.getAllMovies);
// router.get('/:id', movieController.getMovieById);
router.post('/', movieController.addMovie);
router.delete('/:id', movieController.deleteMovie);
router.put('/:id', movieController.updateMovie);

// Menampilkan daftar film
router.get('/paginate/:page', movieController.getAllMovies);

// Menampilkan detail film berdasarkan ID
router.get('/:id', movieController.getMovieById);

// Rute menambah/upload gambar ke kolom photo
router.put('/upload/:id', upload.single('photo'), movieController.updatePhotoMovie);

// app.use('/upload', express.static(path.join(__dirname, 'upload')));



module.exports = router;