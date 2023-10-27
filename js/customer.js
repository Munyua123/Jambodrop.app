// fetch request that will display all products onto the DOM

function displayProducts(item) {
  let products = document.querySelector("#item-list");
  let productDetails = document.createElement("li");
  productDetails.className = "card";
  productDetails.innerHTML = `
  <img src=${item.image} class="card-img-top" alt=${item.title}>
  <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">Available in stock: ${item.availablestock}</p>
    <p class="card-text">${item.description}</p>
    <p class="card-text">Price: ksh${item.price}</p>
    <a href="#" class="btn btn-primary">Add to Checkout</a>
  </div>
    `;
  products.appendChild(productDetails);
}
function displayReviews(items) {
 let review = document.querySelector("#review-list")
 let reviewList = document.createElement("li")
 reviewList.innerHTML=`
 <p> Review: ${items.Review}</p>
 `
 review.appendChild(reviewList)
}
let reviews = document.querySelector("#review-form")
reviews.addEventListener("submit", (e) => {
    e.preventDefault()
    let reviewObj = {
        name: e.target.customerName.value,
        Review: e.target.customerReview.value
    }
    getReviews(reviewObj)
})

const baseUrl = "http://localhost:3000/products";
function getProducts() {
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => data.forEach((item) => displayProducts(item)))
    .catch((error) => console.error("Error:", error));
}

const reviewUrl = "http://localhost:3000/reviews"
function fetchReviews() {
    fetch(reviewUrl)
    .then(res => res.json())
    .then(data => data.forEach(items => displayReviews(items)))
    .catch(error => console.error("Error:", error))
}
function getReviews(reviewObj) {
fetch(reviewUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify(reviewObj)
})
.then(res => res.json())
.then(data => console.log(data))
.catch(error =>  console.error("Error:", error))
}

getProducts();
fetchReviews()
