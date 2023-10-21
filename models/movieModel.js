const pool = require('../config/dbConfig');

// get
const getAllMovies = async (page) => {
    try {
        const itemsPerPage = 10;
        const offset = (page - 1) * itemsPerPage;
        
        const result = await pool.query('SELECT * FROM movies ORDER BY id OFFSET $1 LIMIT $2', [offset, itemsPerPage]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};


const getMovieById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};
  
// post
const addMovie = async (id, title, genres, year) => {
    try {
        // Mengecek apakah id sudah ada dalam database
        const checkResult = await pool.query('SELECT id FROM movies WHERE id = $1', [id]);

        if (checkResult.rowCount > 0) {
            return { success: false, message: 'Movie with the same ID already exists' };
        }

        // Jika id belum ada, lakukan penambahan
        const insertResult = await pool.query(
            'INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)',
            [id, title, genres, year]
        );

        if (insertResult.rowCount > 0) {
            return { success: true, message: 'Movie added successfully' };
        } else {
            return { success: false, message: 'Failed to add movie' };
        }
    } catch (error) {
        throw error;
    }
};


// delete
const deleteMovie = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM movies WHERE id = $1', [id]);

        if (result) {
            return { success: true, message: `Movie with id ${id} is deleted!` };
        };
    } catch (error) {
        throw error;
    }
};

// put
const updateMovie = async (year, id) => {
    try {
        const result = await pool.query(
            'UPDATE movies SET year = $1 WHERE id = $2', [year, id]);

        if (result) {
                return { success: true, message: `Movie with id ${id} is updated!` };
        };
    } catch (error) {
        throw error;
    };
};


// const addPhotoMovie = async (photo, id) => {
//     try {
//         const result = await pool.query(
//             'UPDATE movies SET photo = $1 WHERE id = $2', [photo, id]);

//         if (result) {
//                 return { success: true, message: `Movie with id ${id} has a new photo!` };
//         };
//     } catch (error) {
//         throw error;
//     };
// };

const updatePhotoMovie = async (photopath, id) => {
    try {
        await pool.query(
            'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *', [photopath, id]);
    } catch (error) {
        throw error;
    };
};

const getPhotoPath = async (id) => {
    try {
        const result = await pool.query(
            'SELECT photo FROM movies WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    };
};


module.exports = {getAllMovies, getMovieById, addMovie, deleteMovie, updateMovie, updatePhotoMovie, getPhotoPath};
