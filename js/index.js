document.addEventListener("DOMContentLoaded", () => {
  let productForm = document.querySelector("#postForm");
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let productObj = {
      image: e.target.imageUrl.value,
      title: e.target.productName.value,
      description: e.target.productDescription.value,
      price: e.target.productPrice.value,
      availablestock: e.target.productStock.value,
    };
    getProducts(productObj);
    addProducts(productObj);
  });

  // This deals with the Reviews
  let reviews = document.querySelector("#reviewForm");
  reviews.addEventListener("submit", (e) => {
    e.preventDefault();
    let productReviews = {
      name: e.target.customerName.value,
      Review: e.target.customerReview.value,
    };
    handleReview(productReviews);
    createReview(productReviews);
  });
  // This represents the function that shows the reviews on the DOM
  function handleReview(data) {
    let review = document.querySelector("#review-list");
    let reviewList = document.createElement("li");
    reviewList.className = "reviewslist";
    reviewList.innerHTML = `
    <p>name:${data.name}</p>
    <p>Review:${data.Review}</p>
    <button type="submit" id="deleteReview"> x </button>
    `;
    review.appendChild(reviewList);
    // This represents the activating the button responsible for deleting Reviews
    let deleteReview = reviewList.querySelector("#deleteReview");
    deleteReview.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Do you want to delete the review?")) {
        reviewList.remove();
        handleReviewDelete(data.id);
        alert("Review deleted");
      } else {
        alert("Review not deleted");
      }
    });
  }

  // This function displays the products onto the DOM
  function getProducts(items) {
    let productCard = document.querySelector("#item-list");
    let productDetails = document.createElement("li");
    productDetails.className = "card "
    productDetails.innerHTML = `
    <img src="${items.image}" alt="${items.title}" class="card-img-top" />
    <div class= "card-body">
    <h5 class="card-title">${items.title}</h5>
    <p class="card-text"> ${items.description}</p>
    <p class="card-text">Ksh: ${items.price}</p>
    <p id="productStock" class="card-text">Available stock: ${items.availablestock}</p>
    <button id="productUpdate" class="btn btn-primary">Update</button>
    <button id="delete" class="btn btn-primary">Delete</button>
    </div>
    `;
    productCard.appendChild(productDetails);
    // This function is for updating elements on the DOM
    let update = productDetails.querySelector("#productUpdate");
    update.addEventListener("click", (e) => {
      e.preventDefault();
      if (items.availablestock > 0) {
        items.availablestock -= 1;
        productDetails.querySelector("#productStock").textContent =
          items.availablestock;
        updateProducts(items);
      } else {
        alert("Error:Stock is empty. Please add stock.");
      }
    });

    // activating the delete function button
    let deleteProduct = productDetails.querySelector("#delete");
    deleteProduct.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this product?")) {
        productDetails.remove();
        deletefull(items.id);
        alert("Delete Succesful");
      } else {
        alert("Product was not deleted");
      }
    });
  }

  const base_Url = "http://localhost:3000/products";

  const reviewUrl = "http://localhost:3000/reviews";

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

  // This fetch request is responsible for adding products onto the DOM
  function addProducts(productObj) {
    fetch(base_Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObj),
    })
      .then((res) => res.json())
      .then((items) => console.log(items));
  }

  // This fetch is for updating the products.
  function updateProducts(productObj) {
    fetch(`http://localhost:3000/products/${productObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObj),
    })
      .then((res) => res.json())
      .then((items) => console.log(items));
  }

  function deletefull(id) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((items) => console.log(items));
  }
  function fetchReview() {
    fetch(reviewUrl)
      .then((res) => res.json())
      .then((reviews) => reviews.forEach((data) => handleReview(data)));
  }
  function createReview(productReviews) {
    fetch(reviewUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productReviews),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  function handleReviewDelete(id) {
    fetch(`${reviewUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  fetchReview();
  fetchProducts();
});
