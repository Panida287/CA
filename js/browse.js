const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes"
let moviesArray = [];
const container1 = document.querySelector(".posters-grid-1");
const container2 = document.querySelector(".posters-grid-2");
const dramaButton = document.getElementById("drama");
const actionButton = document.getElementById("action");
const comedyButton = document.getElementById("comedy");
const loadingDiv = document.getElementById("loader");
const resultContainer = document.getElementById("result-container");

async function fetchData() {
    try {
        const HTTPResponse = await fetch(squareEyesAPI);
        const moviesArray = await HTTPResponse.json();
        moviesArray.slice(0, 6).forEach(item => {
            const card = document.createElement("a");
            card.classList.add("card");
            card.href = `product-page.html?id=${item.id}`;
            card.innerHTML = `
                <figure class="movie-container">
                    <img src="${item.image}" class="card-image">
                </figure>
            `;
            container1.appendChild(card);
        });

        moviesArray.slice(6, 12).forEach(item => {
            const card = document.createElement("a");
            card.classList.add("card");
            card.href = `product-page.html?id=${item.id}`;
            card.innerHTML = `
                <figure class="movie-container">
                    <img src="${item.image}" class="card-image">
                </figure>
            `;
            container2.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//filter


fetchData();







