const pool = require('../config/dbConfig');

class movieModel {
    // get
    async getAllMovies (page) {
        try {
            const itemsPerPage = 10;
            const offset = (page - 1) * itemsPerPage;
            
            const result = await pool.query('SELECT * FROM movies ORDER BY id OFFSET $1 LIMIT $2', [offset, itemsPerPage]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    };

    // get
    async getMovieById (id) {
        try {
            const result = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    };
  
    // post
    async addMovie ({id, title, genres, year, photo}) {
        try {
            await pool.query(
                'INSERT INTO movies (id, title, genres, year, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [id, title, genres, year, photo]
            );
        } catch (error) {
            throw error;
        }
    };

    // delete
    async deleteMovie (id) {
        try {
            await pool.query(
                'DELETE FROM movies WHERE id = $1', [id]);
        } catch (error) {
            throw error;
        }
    };

    // put
    async updateMovie ({title, genres, year, photo, id}) {
        try {
            await pool.query(
                'UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *', [title, genres, year, photo, id]);
        } catch (error) {
            throw error;
        };
    };

    // put
    async updatePhotoMovie ({photo, id}) {
        try {
            await pool.query(
                'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *', [photo, id]);
        } catch (error) {
            throw error;
        };
    };
}



module.exports = new movieModel();
