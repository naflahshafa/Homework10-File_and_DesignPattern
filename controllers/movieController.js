const movieRepository = require('../repositories/movieRepository');

class movieController {
    // Menampilkan daftar film
    async getAllMovies (req, res) {
        try {
            const page = req.params.page // Mendapatkan halaman dari parameter URL
            const movies = await movieRepository.getAllMovies(page);

            res.render('movies/index', { movies });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam menampilkan daftar film.' });
        }
    };

    // Menampilkan detail film berdasarkan ID
    async getMovieById (req, res) {
        try {
            const id = req.params.id;
            const movie = await movieRepository.getMovieById(id);

            if (movie.length === 0) {
                res.status(404).json({ error: 'Film tidak ditemukan.' });
            } else {
                res.render('movies/detail', { movie });
            }
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan dalam menampilkan detail film.' });
        }
    };

    async addMovie (req, res) {
        const { id, title, genres, year } = req.body;
        const photo = req.file.path;

        try {
            const insertMovie = await movieRepository.addMovie({id, title, genres, year, photo});
            
            res.status(200).json({succes: true, message: 'Movie is added successfully!', movie: insertMovie});
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };


    async deleteMovie (req, res) {
        const {id} = req.params;
        try {
            const delMovie = await movieRepository.deleteMovie(id);
            res.status(200).json({success: true, message: `Movie with id ${id} is deleted!`});
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    async updateMovie (req, res) {
        const {title, genres, year} = req.body;
        const photo = req.file.path;
        const {id} = req.params;
        try {
            const changeMovie = await movieRepository.updateMovie(title, genres, year, photo, id);
            res.status(200).json({success: true, message: `Movie with id ${id} is updated!`, movie: changeMovie});
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    async updatePhotoMovie (req, res) {
        const file = req.file;
        if (!file) {
        return res.status(400).json({
            status: false,
            data: 'No file is selected.',
        });
        }

        const photo = file.path;

        // Fungsi updatePhotoMovie menerima tiga argumen: req.params.id, photo, dan sebuah callback yang disediakan sebagai (err, savedMovie) => {...}. Ketika operasi updatePhotoMovie selesai, callback akan dipanggil dengan dua argumen: err (jika ada kesalahan) dan savedMovie (hasil operasi).
        movieRepository.updatePhotoMovie(req.params.id, photo, (err, result) => {
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
}


module.exports = new movieController();