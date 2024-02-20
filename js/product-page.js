const moviesArray = [];
const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";
const container = document.querySelector('.posters');
const urlParameter = new URLSearchParams(window.location.search);
const movieID = urlParameter.get("id");
const basket = JSON.parse(localStorage.getItem("data")) || [];

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
                    <div class="poster-image" id=${selectedMovie.id}>
                        <img src="${selectedMovie.image}" width="200px" height="300px">
                    </div>
                    <div class="description-text">
                        <p>Genre: ${selectedMovie.genre}</p>
                        <p>Release year: ${selectedMovie.released}</p>
                        <p>IMDB Rating: ${selectedMovie.rating}</p>
                        <p>Description: ${selectedMovie.description}</p>
                        <h2>${selectedMovie.price} NOK</h2>
                        <div class="button-container">
                            <button onclick="addToCart('${selectedMovie.id}')" id="add-or-remove" class="add-to-cart-btn">
                            Add to cart
                            </button>
                            <a href="browse.html" class="btn">
                            Back to Browse
                            </a>
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

fetchData();

const addToCart = (id) => {
    const index = basket.findIndex(item => item.id === id);
    if (index === -1) {
        basket.push({
            id: id,
            item: 1
        });
        document.getElementById("add-or-remove").innerHTML = "Remove";
        alert("Item added to cart!");
    } else {
        basket.splice(index, 1);
        document.getElementById("add-or-remove").innerHTML = "Add to cart";
        alert("Item removed from cart!");
    }

    localStorage.setItem("data", JSON.stringify(basket));
}


