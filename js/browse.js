const apiArray = []
const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes"
const container1 = document.querySelector(".posters-grid-1");
const container2 = document.querySelector(".posters-grid-2");

fetch(squareEyesAPI)
    .then(function (HTTPresponse){
        return HTTPresponse.json()
    })
    .then(function(apiResult) {
        const apiArray = apiResult;
        apiArray.slice(0, 6).forEach(item => {
            const card = document.createElement("a");
            card.classList.add("card");
            card.href = `product-page.html?id=${item.id}`
            card.innerHTML = `
                <figure class="movie-container">
                    <img src="${item.image}" class="card-image">
                </figure>
            `;
            container1.appendChild(card);
        })
        apiArray.slice(6, 12).forEach(item => {
            const card = document.createElement("a");
            card.classList.add("card");
            card.href = `product-page.html?id=${item.id}`
            card.innerHTML = `
                <figure class="movie-container">
                    <img src="${item.image}" class="card-image">
                </figure>
            `;
            container2.appendChild(card);
        })
    })