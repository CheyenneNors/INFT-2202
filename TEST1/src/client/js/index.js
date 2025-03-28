/*
Name: Cheyenne Norsworthy
Filename: index.js
Course: INFT 2202
Date: January 31, 2025
Description: This is my index javascript page to display a list of movies.
*/

// import the movies array from the supplied data file.
import { movies } from "../data/movies.js"; 
// write the array to the console, so you can see that they are loading properly
console.log('we are on the movie page');
console.log(movies);
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table

// get a list of `pinnedMovies` from local storage
// log them out so you can see that you have working pins
// if there are no pinned movies, put a message on the screen that says so
// but if there are, hide the message
/* call insertMoviesIntoTable, 
    give it a reference to the table you want to populate,
    and the list of movies you want to show in the table */
// show the table



/* 
 *  getPinnedMoviesFromStorage
 *  This should take no parameters, and return an array.
 */
function getPinnedMoviesFromStorage() {
    const pinned = localStorage.getItem("pinnedMovies");
    return pinned ? JSON.parse(pinned) : [];
}

const pinnedMovies = getPinnedMoviesFromStorage();
console.log("Pinned Movies:", pinnedMovies);

const pinnedMoviesAlert = document.querySelector("#pinned-movies-container .alert");
const pinnedMoviesTable = document.querySelector("#pinned-movies-container table");
if (pinnedMovies.length === 0) {
    pinnedMoviesAlert.classList.remove("d-none");
} else {
    pinnedMoviesAlert.classList.add("d-none");
    pinnedMoviesTable.classList.remove("d-none");
    insertMoviesIntoTable(pinnedMoviesTable, pinnedMovies);
}

const allMoviesAlert = document.querySelector("#all-movies-container .alert");
const allMoviesTable = document.querySelector("#all-movies-container table");

if (movies.length === 0) {
    allMoviesAlert.classList.remove("d-none");
} else {
    allMoviesAlert.classList.add("d-none");
    allMoviesTable.classList.remove("d-none");
    insertMoviesIntoTable(allMoviesTable, movies);
}


/*
 *  insertMoviesIntoTable
 *  This should take two parameters,
 *  - a reference to the table you want to populate
 *  - a list of movies to put in the table
 *  It should return nothing
 */
function insertMoviesIntoTable(eleTable, movies) 
{
    // sort the list of movies by rating, highest to lowest
    movies.sort((a, b) => b.rating - a.rating);

    const tbody = eleTable.querySelector("tbody");
    tbody.innerHTML = "";

    // for each movie
    movies.forEach(movie => {
        // insert a row
        const row =eleTable.insertRow();
        // insert a cell for each attribute of a movie
        row.insertCell().textContent = movie.title;
        row.insertCell().textContent = movie.genre;
        // the datetime is a "unix timestamp", measured in seconds.  
        //   javascript dates are measured in milliseconds.
        //   convert this timestamp to a javascript date and print out the date as a normal string in english
        row.insertCell().textContent = new Date(movie.release_date * 1000).toLocaleDateString();
        row.insertCell().textContent = movie.director;
        row.insertCell().textContent = movie.rating;
        row.insertCell().textContent = movie.pin;
        // create a new button element
        const pinCell = row.insertCell();
        const pinButton = document.createElement("button");
        pinButton.classList.add("btn", "btn-sm");

        let pinnedMovies = getPinnedMoviesFromStorage();
        const isPinned = pinnedMovies.some(p => p.title === movie.title);

        // look in local storage to see if this item is already pinned
        //   if it's already pinned, make it red, otherwise make it blue
        // set the html so it shows a font-awesome icon
        //   if it's already pinned, show an x, otherwise show a pencil

        if (isPinned) {
            pinButton.classList.add("btn-danger");
            pinButton.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            pinButton.classList.add("btn-primary");
            pinButton.innerHTML = '<i class="fas fa-thumbtack"></i>';
        }

        // add an event listener, when this button is clicked...
            // if it is, remove it from the list
            // it it's not, add it to the list 
            // refresh the page

        pinButton.addEventListener("click", () => {
            let pinnedMovies = getPinnedMoviesFromStorage(); // Reload the latest pinnedMovies here
            let updatedPins;
            
            if (isPinned) {
                updatedPins = pinnedMovies.filter(p => p.title !== movie.title);
            } else {
                updatedPins = [...pinnedMovies, movie];
            }
            
            localStorage.setItem("pinnedMovies", JSON.stringify(updatedPins));
            location.reload(); // Refreshes the page to reflect changes
        });
            

        // create another table row and put the button in it
        // if a movie is rated two or below, make this row red
        // if this movie is rated higher than two but less than or equal to five, make this row orange
        // if this movie is rated higher than five but less than or equal to 8, make this row blue
        // if this movie is rated higher than eight, make this row green
        // if this movie is a drama, don't add it to the list
        pinCell.appendChild(pinButton);

        if (movie.rating <= 2) {
            row.classList.add("table-danger");
        } else if (movie.rating > 2 && movie.rating <= 5) {
            row.classList.add("table-warning");
        } else if (movie.rating > 5 && movie.rating <= 8) {
            row.classList.add("table-info");
        } else {
            row.classList.add("table-success");
        }


        
        

    }); 
}
