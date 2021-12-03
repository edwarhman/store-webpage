function fetchProducts() {
  fetch("products.json")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let products = json;
      console.log(products);
      initialize(products);
    })
    .catch((err) => {
      console.log("Fetch problem: " + err.message);
    });
}

function initialize(products) {
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

  function selectCategory() {
    categoryProducts = [];
    finalProducts = [];

    if (categorySelector.value !== lastCategory || searchBar.value !== lastSearch) {

      console.log(categorySelector.value, searchBar.value);

      lastCategory = categorySelector.value;
      lastSearch = searchBar.value;

      if (categorySelector.value === "all") {
        categoryProducts = products;
        console.log("All");
      } else {
        products.forEach(product => {
          if (product.type === categorySelector.value) {
            categoryProducts.push(product);
          }
        });
      }
    selectProducts();
    }
  }

  function selectProducts() {
    if (searchBar.value === "") {
      console.log("search bar is empty");
      finalProducts = categoryProducts;
    } else {
      console.log("search bar have a value");
      const search = searchBar.value;
      categoryProducts.forEach(product => {
        if(product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
          finalProducts.push(product);
        }
      })
    }
    updateDisplay();
  }

  // clear 
  
  
  // clear the display and print the updated products
  function updateDisplay() {
    // clear old products
    while (productsContainer.firstChild) {
      productsContainer.removeChild(productsContainer.firstChild);
    }

    // show a mesage if there doesn't any product to print 
    if (finalProducts.length === 0) {
      const para = document.createElement("p");
      para.classList.add("no-products-message");
      para.textContent = "Sorry, There is not any coicidence with your search";
      productsContainer.appendChild(para);
    }

    finalProducts.forEach((product) => {
      fetchBLob(product);
    })
  }

  function fetchBLob(product) {
    let url = "./images/" + product.image;
    fetch(url)
      .then(response => {
        return response.blob();
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

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    selectCategory();
  });

  const url = "images/" + products[0].image;
  console.log(url);
  }

fetchProducts();
