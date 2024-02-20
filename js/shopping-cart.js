const squareEyesAPI = "https://api.noroff.dev/api/v1/square-eyes";
let moviesArray = [];
let basket = JSON.parse(localStorage.getItem("data")) || [];
const container = document.getElementById("items");
const priceContainer = document.getElementById("total");
const policyContainer = document.getElementById("price-container");
async function fetchData() {
    try {
        const HTTPResponse = await fetch(squareEyesAPI);
        moviesArray = await HTTPResponse.json();
        generateCartItems();
        totalAmount();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const generateCartItems = () => {
    if (basket.length !== 0 && moviesArray.length !== 0) {
        container.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = moviesArray.find((y) => y.id === id) || {};
            return `
            <div class="cart-items">
                <img width="150" height="150" src="${search.image}" alt=""/>
                <div class="product-detail">
                    <p class="product-header">${search.title}</p>
                    <p>Rating: ${search.rating}</p>
                    <p>${search.description}</p>
                    <p class="price">${search.price} NOK</p>
                </div>
                <button onclick="removeItem('${id}')" class="btn" id="remove-item">Remove</button>
            </div>
            `;
        }).join("");
    } else {
        container.innerHTML = `
        <h1>Your cart is empty</h1>
        <a href="browse.html" class="btn">Back to browse</a>
        `;
        policyContainer.style.display = "none";
    }
};

const removeItem = (id) => {
    basket = basket.filter((x) => x.id !== id);
    generateCartItems();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
}

const totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = moviesArray.find((y) => y.id === id) || {};
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        priceContainer.innerHTML = `
        <h2 class="total-price">Total: ${amount} NOK</h2>
        `;
    } else {
        priceContainer.innerHTML = "";
    }
};

async function init() {
    await fetchData();
}

init();
