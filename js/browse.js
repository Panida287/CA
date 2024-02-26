const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes"
let moviesArray = [];
const container1 = document.querySelector(".posters-grid-1");
const container2 = document.querySelector(".posters-grid-2");
const dramaButton = document.getElementById("drama-button");
const actionButton = document.getElementById("action-button");
const comedyButton = document.getElementById("comedy-button");
const viewAllButton = document.getElementById("view-all-button");
const loadingDiv = document.getElementById("loader");
const resultContainer = document.getElementById("result-container");
const header = document.getElementById("header");

async function fetchData() {
    try {
        const HTTPResponse = await fetch(squareEyesAPI);
        moviesArray = await HTTPResponse.json();
        displayMovies(moviesArray);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies) {
    resultContainer.innerHTML = "";

    movies.forEach(item => {
        const card = createMovieCard(item);
        resultContainer.appendChild(card);
    });
}

function createMovieCard(item) {
    const card = document.createElement("a");
    card.classList.add("card");
    card.href = `product-page.html?id=${item.id}`;
    card.innerHTML = `
        <figure class="movie-container">
            <img src="${item.image}" class="card-image">
        </figure>
    `;
    loadingDiv.style.display = "none";
    return card;

}

dramaButton.addEventListener("click", function() {
    header.innerHTML = "Drama";
    const dramaMovies = moviesArray.filter(movie => movie.genre.toLowerCase().includes("drama"));
    displayMovies(dramaMovies);
    loadingDiv.style.display = "none";

});

actionButton.addEventListener("click", function() {
    header.innerHTML = "Action";
    const actionMovies = moviesArray.filter(movie => movie.genre.toLowerCase().includes("action"));
    displayMovies(actionMovies);
    loadingDiv.style.display = "none";
});

comedyButton.addEventListener("click", function() {
    header.innerHTML = "Comedy";
    const comedyMovies = moviesArray.filter(movie => movie.genre.toLowerCase().includes("comedy"));
    displayMovies(comedyMovies);
    loadingDiv.style.display = "none";
});

viewAllButton.addEventListener("click", function() {
    header.innerHTML = "All Movies";
    displayMovies(moviesArray);
    loadingDiv.style.display = "none";
});


fetchData();







