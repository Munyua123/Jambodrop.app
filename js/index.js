document.addEventListener("DOMContentLoaded", () => {
  function fetchProducts() {
    const base_Url = "http://localhost:3000/products";

    fetch(base_Url)
      .then((res) => res.json())
      .then((data) => data.forEach(items => {
        getProducts(items)
      }))
      .catch((error) => console.error("Error", error));
  }
  function getProducts(items) {
    let productCard = document.querySelector(".card");
    let productDetails = document.createElement("div")
    productDetails.innerHTML = `
    <img src="${items.image}" alt="${items.title}" class="card-img-top" />
    <div class= "card-body">
    <h5 class="card-title">${items.title}</h5>
    <p class="card-text"> ${items.description}</p>
    <p class="card-text">Ksh: ${items.price}</p>
    <button id="delete" class="btn btn-primary">Delete</button>
  </div>
    `
    productCard.appendChild(productDetails)
  }
  fetchProducts();
});
