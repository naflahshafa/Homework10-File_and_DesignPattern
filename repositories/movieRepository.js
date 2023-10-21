const movieModel = require('../models/movieModel');

class movieRepository {
    async getAllMovies(page) {
        return movieModel.getAllMovies(page);
    }

    async getMovieById(id) {
        return movieModel.getMovieById(id);
    }

    async addMovie({id, title, genres, year, photo}) {
        return movieModel.addMovie({id, title, genres, year, photo});
    }

    async deleteMovie(id) {
        return movieModel.deleteMovie(id);
    }

    async updateMovie({title, genres, year, photo, id}) {
        return movieModel.updateMovie({title, genres, year, photo, id});
    }

    async updatePhotoMovie ({photopath, id}) {
        return movieModel.updatePhotoMovie({photopath, id});
    }

    async getPhotoPath (id) {
        return movieModel.getPhotoMovie(id);
    }
};

module.exports = new movieRepository();