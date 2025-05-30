// import the express library
// set the port for the server, use 3022
// create a new server instance
// configure the body renderer to parse json inputs
// automatically serve static assets from the client folder
// automatically serve static assets from the node_modules folder
// create a new router instance
// create a new route and route handler, check the README for more details.
// configure the server to use your new router instance
// start the server
import express from 'express';
import cors from 'cors';
import { movies } from './data/movies.js';  // Make sure to use named import
const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());

app.use(express.static('public'));  // Serve static files

app.get('/api/movies', (req, res) => {
    try {
        let filteredMovies = [...movies];
        const { rating, genre } = req.query;

        if (rating) {
            const ratingNum = parseFloat(rating);

            if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
                return res.status(400).json({ message: 'Rating must be a number between 1 and 10.' });
            }

            filteredMovies = filteredMovies.filter(movie => movie.rating >= ratingNum);
        }

        if (genre) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.genre.toLowerCase().includes(genre.toLowerCase())
            );

            if (filteredMovies.length === 0) {
                return res.status(404).json({ message: 'No movies found for the specified genre.' });
            }
        }

        filteredMovies.sort((a, b) => b.rating - a.rating);
        res.json(filteredMovies);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Test 3 app listening on port ${port}!`);
});
