// Definisikan dependency
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Multer sebagai salah satu middleware
const path = require('path'); // Menambahkan path
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 8000;
const pool = require('./config/dbConfig');
const router = require('./routes/index');


var corOptions = {
    origin: 'http://localhost:8000'
}

app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(router)

// Mengatur EJS sebagai template engine
app.set('view engine', 'ejs');

// Menentukan direktori tata letak (views)
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.json({message: 'Hello from API'})
})

pool.connect((err, res) => {
    console.log(err);
    console.log('Connected');
});

// // Menentukan lokasi pengunggahan
// const diskStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '/upload'));
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
// });

// // Rute untuk upload foto yang menerapkan middleware multer
// app.put("/upload", multer({storage: diskStorage}).single("photo"), (req, res) => {
//     const file = req.file.path;
//     console.log(file);
//     if (!file) {
//         res.status(400).send({status: false, data: "No file is selected.",})
//     }

//     // Menyimpan lokasi upload photo pada index yang diinginkan
//     res.send(file);
// });

// // Function menampilkan file static pada server: express.static(root, [options])
// // Navigasi ke http://localhost:{PORT}/{nama folder tmpt potonya kesimpan}/{nama file potonya}
// // contoh: http://localhost:8000/upload/photo-1697791711679.jpg
// app.use('/upload', express.static(path.join(__dirname, 'upload')));





app.use('/upload', express.static(path.join(__dirname, 'upload')));

// const diskStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '/upload')); // -> /upload
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname)); // example -> file-1234567890.jpg
//     }
// });

// app.put('/movies/upload', multer({ storage: diskStorage }).single('photo'), (req, res) => {
//     const file = req.file;
//     console.log(file);
//     if (!file) {
//         res.status(400).send({
//             status: false,
//             data: 'No file is selected.'
//         });
//     }
//     // movies[req.query.index].photo = req.file.path;
//     res.send(file);
// });

// const upload = multer({ storage: diskStorage });

// // create a put route to upload photo to database
// app.put('/movies/upload/:id', upload.single('photo'), (req, res) => {
//     const file = req.file;
//     if (!file) {
//         return res.status(400).json({
//             status: false,
//             data: 'No file is selected.',
//         });
//     }

//     const photoPath = file.path; // Path to the uploaded photo

//     // Add image to photo column
//     const insertQuery = 'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *';

//     pool.query(insertQuery, [photoPath, req.params.id], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({
//                 status: false,
//                 error: 'An error occurred while processing your request.',
//             });
//         }

//         const savedMovie = result.rows[0];
//         res.json({
//             status: true,
//             data: savedMovie,
//         });
//     });
// });

// // serve the image by its path
// app.get('/movies/photo/:id', (req, res) => {
//     const id = req.params.id;
//     const selectQuery = 'SELECT photo FROM movies WHERE id = $1';

//     pool.query(selectQuery, [id], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({
//                 status: false,
//                 error: 'An error occurred while processing your request.',
//             });
//         }

//         const movie = result.rows[0];
//         res.sendFile(movie.photo);
//     });
// });






// app.get('/movies/photo/:id', (req, res) => {
//     const id = req.params.id;
//     const selectQuery = 'SELECT photo FROM movies WHERE id = $1';

//     pool.query(selectQuery, [id], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({
//                 status: false,
//                 error: 'An error occurred while processing your request.',
//             });
//         }

//         const movie = result.rows[0];
//         if (movie && movie.photo) {
//             // Simpan data gambar ke file di sistem file (contoh: dengan nama file berdasarkan id)
//             const filePath = path.join(__dirname, `upload/photo-${id}.jpg`);
            
//             // Tulis data gambar ke file
//             fs.writeFile(filePath, movie.photo, (err) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).json({
//                         status: false,
//                         error: 'An error occurred while saving the image file.',
//                     });
//                 }

//                 // Kirim file gambar yang telah disimpan
//                 res.sendFile(filePath);
//             });
//         } else {
//             res.status(404).json({
//                 status: false,
//                 error: 'Image not found.',
//             });
//         }
//     });
// });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
