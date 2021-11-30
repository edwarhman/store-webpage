let searchBar = document.getElementById("search-bar");
let categorySelector = document.getElementById("category-selector");
let submitButton = document.getElementById("submit-button");

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

fetchProducts();

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
});