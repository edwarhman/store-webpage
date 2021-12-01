

function fetchProducts() {
  fetch("products.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let products = json;
      console.log(products[0]);
    })
    .catch((err) => {
      console.log("Fetch problem: " + err.message);
    });
}

function initialize() {
    // DOM element references
    let productsContainer = document.querySelector(".products-container__inner");
    let searchBar = document.getElementById("search-bar");
    let categorySelector = document.getElementById("category-selector");
    let submitButton = document.getElementById("submit-button");
    // necessary variables
    let lastSearch = "";
    let lastCategory = categorySelector.value;
    let categoryProducts = [];
    let finalProducts = [];

    function fetchBLob(product) {
        let url = "./images/" + product.image;
        fetch(url)
        .then(response => {
            return response.blob;
        })
        .then(blob => {
            let imageURL = URL.createObjectURL(blob);
            printProduct(product, imageURL);
        })
        .catch(err => {
            console.log("Fetch error: " + err.message);
        });
    }

    function printProduct(product, url) {
        // new DOM elements
        const article = document.createElement("article");
        const content = document.createElement("div");
        const image = document.createElement("img");
        const price = document.createElement("p");
        const name = document.createElement("h2");

        // setting classes
        article.classList.add("product-item");
        content.classList.add("product-item__content");

        // fill article with product data
        image.src = url;
        image.alt = product.name;
        price.textContent = product.price + "$";
        name.textContent = product.name;

        // print object
        content.appendChild(image);
        content.appendChild(price);
        content.appendChild(name);
        article.appendChild(content);
        productsContainer.appendChild(article);
    }
}

fetchProducts();

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
});