const moviesArray = [];
const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";
const container = document.querySelector('.posters');
const urlParameter = new URLSearchParams(window.location.search);
const movieID = urlParameter.get("id");

async function fetchData() {
    try {
        const HTTPResponse = await fetch(squareEyesAPI);
        const apiResult = await HTTPResponse.json();
        const selectedMovie = apiResult.find(item => item.id === movieID);

        if (selectedMovie) {
            const movieDetails = document.createElement('div');
            movieDetails.classList.add('movie-details');
            movieDetails.innerHTML = `
                <h1>${selectedMovie.title} (${selectedMovie.released})</h1>
                <div class="movie-container">
                    <div class="poster-image">
                        <img src="${selectedMovie.image}" width="200px" height="300px">
                    </div>
                    <div class="description-text">
                        <p>Genre: ${selectedMovie.genre}</p>
                        <p>Release year: ${selectedMovie.released}</p>
                        <p>IMDB Rating: ${selectedMovie.rating}</p>
                        <p>Description: ${selectedMovie.description}</p>
                        <div class="button-container">
                            <button onclick="addToCart('${selectedMovie.id}')" class="add-to-cart-btn">
                            Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(movieDetails);
        } else {
            console.log("Failure");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function addToCart(x) {
    const storedValue = localStorage.getItem(x) === 'true';
    const changedState = !storedValue
    localStorage.setItem(x, changedState);

    if (changedState){
        console.log(`Movie ${x} add to cart`)
    } else {
        console.log(`Movie ${x} remove from cart`)
    }
}

fetchData();
