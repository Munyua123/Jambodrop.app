document.addEventListener("DOMContentLoaded", () => {
  const base_Url = "http://localhost:3000/products";
  
  let productForm = document.querySelector("#postForm")
  productForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let productObj = {
      image: e.target.imageUrl.value,
      title: e.target.productName.value,
      description: e.target.productDescription.value,
      price: e.target.productPrice.value
    }
    getProducts(productObj)
    addProducts(productObj)
    updateProducts(productObj)
  })
  // This fetch request is responsible for adding products onto the DOM
  function addProducts(productObj) {
    fetch(base_Url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(productObj),
      })
        .then(res => res.json())
        .then(items => console.log(items))
  }


  // This function is for updating elements on the DOM
  let Update = document.querySelector("#productUpdate")
  Update.addEventListener("click",updateProducts)
  // This fetch is for updating the products.
  function updateProducts(productObj) {
   fetch(`http://localhost:3000/products/${productObj.id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(productObj)
   })
   .then(res => res.json())
   .then(data => console.log(data))
  }
  // This deals with the Reviews
  let reviews = document.querySelector("#reviewForm")
  reviews.addEventListener("submit", (e) => {
    e.preventDefault()
    handleReviews(e.target)
  })
  // This function displays the products onto the DOM
  function getProducts(items) {
    let productCard = document.querySelector(".card");
    let productDetails = document.createElement("div");
    productDetails.innerHTML = `
    <img src="${items.image}" alt="${items.title}" class="card-img-top" />
    <div class= "card-body">
    <h5 class="card-title">${items.title}</h5>
    <p class="card-text"> ${items.description}</p>
    <p class="card-text">Ksh: ${items.price}</p>
    <button id="delete" class="btn btn-primary">Delete</button>
    </div>
    `;
    productCard.appendChild(productDetails);
  }

  function fetchProducts() {
    // This fetch request is for a GET request that manipulates the DOM to show the products
    fetch(base_Url)
      .then((res) => res.json())
      .then((data) =>
        data.forEach((items) => {
          getProducts(items);
        })
      )
      .catch((error) => console.error("Error", error));
  }
  fetchProducts();
});
