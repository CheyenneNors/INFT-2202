// Follow the README.md to set up the rest of this file.
/*
 *  fetchMovies
 *  This should take two parameters
 *  -   The genre you want to filter by, defaults to null
 *  -   The rating you want to filter by, defaults to null
 *  It should return a list a movies
 *  It should throw an error if something went wrong
 *  You need to use the following classes: URLSearchParams, URL, Headers, and Request.
 */
/*
 *  insertMoviesIntoTable
 *  This should take two parameters
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
    // use the reference to the table to get a reference to the tbody
    // empty the table first
    // for each movie
        // insert a row into your table element
        // insert a cell for each attribute of a movie
        // the datetime is a "unix timestamp", measured in seconds.  
        // javascript dates are measured in milliseconds.
        // convert this timestamp to a javascript date and print out the date as a normal string
        // if a movie is rated two or below, make this row red
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        // if this movie is rated higher than eight, make this row green

async function fetchMovies (genre = null, rating = null) {
    try{
        const params = new URLSearchParams();
        if(genre) params.append('genre', genre);
        if(rating) params.append('rating', rating);

        const url = new URL(`/api/movies?${params.toString()}`, window.location.origin);
        const response = await fetch (url, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error (error.message, 'Something went wrong'); 
        }

        const movies = await response.json();
        return movies;
    } catch (error) {
        displayError(error.message);
        return[];
    }
}

function insertMoviesIntoTable (table, movies) {
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    movies.forEach (movie => {
        
        const row = tbody.insertRow();

        const titleCell = row.insertCell();
        const genreCell = row.insertCell();
        const ratingCell = row.insertCell();
        const dateCell = row.insertCell();

        
        titleCell.textContent = movie.title;
        genreCell.textContent = movie.genre;
        ratingcell.textContent = movie.rating;
        const date = new Date(movie.datetime *1000);
        dateCell.textContent = date.toLocaleString();

        if (movie.rating <= 2) row.style.backgroundColor = 'red';
        else if (movie.rating <= 5) row.style.backgroundColour = 'orange';
        else if (movie.rating <= 8) row.style.backgroundColour = 'blue';
        else row.style.backgroundColour = 'green';
    });

    table.style.display = movies.length > 0 ? 'table': 'none';
}

function displayError(message) {
    const errorMessage = document.getElementById ('error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/* function updateFooter() {
    const footer = document.querySelector('footer');
    const currentYear = new Date().getFullYear();
    footer.textContent = `Created by Cheyenne Norsworthy, ${currentYear}`;
} */

//updateFooter();

const genreDropdown = document.getElementById('genre');
const ratingDropDown = document.getElementById('rating');
const movieTable = document.getElementById('movie-table');

async function handleFilterChange() {
    const genre = genreDropdown.value;
    const rating = ratingDropDown.value;
    const movies = await fetchMovies(genre, rating);

    if (movies.length > 0 ) {
        insertMoviesIntoTable(movieTable, movies);
    } else {
        displayError('No movies match your selected filters.');
    }
}

genreDropdown.addEventListener('change', handleFilterChange);
ratingDropDown.addEventListener('change', handleFilterChange);