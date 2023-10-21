const movieModel = require('../models/movieModel'); // Import model (movieModel.js)


// Menampilkan daftar film
const getAllMovies =  async (req, res) => {
    try {
        const page = req.params.page // Mendapatkan halaman dari parameter URL
        const movies = await movieModel.getAllMovies(page);

        res.render('movies/index', { movies });
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan dalam menampilkan daftar film.' });
    }
};

// Menampilkan detail film berdasarkan ID
const getMovieById = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await movieModel.getMovieById(id);

        if (movie.length === 0) {
            res.status(404).json({ error: 'Film tidak ditemukan.' });
        } else {
            res.render('movies/detail', { movie });
        }
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan dalam menampilkan detail film.' });
    }
};



// const getAllMovies = async (request, response) => {
//     const page = parseInt(request.params.page);
//     try {
//         const movies = await movieModel.getAllMovies(page);
//         response.status(200).json(movies);
//     } catch (err) {
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// const getMovieById = async (request, response) => {
//     const id = parseInt(request.params.id);
//     try {
//         const movie = await movieModel.getMovieById(id);
//         response.status(200).json(movie);
//     } catch (err) {
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const addMovie = async (request, response) => {
    const { id, title, genres, year } = request.body;

    try {
        const insertMovie = await movieModel.addMovie(id, title, genres, year);
        response.status(200).json(insertMovie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteMovie = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const delMovie = await movieModel.deleteMovie(id);
        response.status(200).json(delMovie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateMovie = async (request, response) => {
    const year = parseInt(request.body.year);
    const id = parseInt(request.params.id);
    try {
        const changeMovie = await movieModel.updateMovie(year, id);
        response.status(200).json(changeMovie);
    } catch (err) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

// const addPhotoMovie = async (request, response) => {
//     const {photo} = request.file;
//     const {id} = request.params;
//     try {
//         const photoMovie = await movieModel.addPhotoMovie(photo, id);
//         response.status(200).json(photoMovie);
//     } catch (err) {
//         response.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const updatePhotoMovie = async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        status: false,
        data: 'No file is selected.',
      });
    }

    const photoPath = file.path;

    // Fungsi updatePhotoMovie menerima tiga argumen: req.params.id, photoPath, dan sebuah callback yang disediakan sebagai (err, savedMovie) => {...}. Ketika operasi updatePhotoMovie selesai, callback akan dipanggil dengan dua argumen: err (jika ada kesalahan) dan savedMovie (hasil operasi).
    movieModel.updatePhotoMovie(req.params.id, photoPath, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: false,
          error: 'An error occurred while processing your request.',
        });
      }

      const savedMovie = result.rows[0];
      res.json({
        status: true,
        data: savedMovie,
      });
    });
};


module.exports = {getAllMovies, getMovieById, addMovie, deleteMovie, updateMovie, updatePhotoMovie,};

