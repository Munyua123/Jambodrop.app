Welcome to Project Jambodrop, this is a personal project that showcases an e-commerce platform that allows small businesses in Kenya. It hosts the businesses sallowing them to advertise and offer product to customers, it also allows customers to carry out Customer to Customer selling, where they can upload pictures of things they want to sell.

This represents the first Phase where it showcases the seller part of the website. This first pae is where the business details together with a collection of their products and reviews.

Since this is the seller side of the App they have the allowance to create, delete, update and get data from our server.

We have already created the HTML, that will help us know where the elements will go when we are manipulating the DOM.

Now onto the JavaScript.

We were challenged to use atleast 3 fetch methods. In our web app for this first phase we will have the 

**Get Requets**
This will mainly be on the card part of our HTML.
we will first create our db.json, we will then add more data using Postman to be atleast 15 products.

We will then try and fetch the 15 products and try and display them onto the DOM. 

For the get request we first add our first eventlistener which listens for the DOMContentLoaded and passed in is an empty callbackfunction where our data will be passed in.

We first create a function that will deal with the GET request. inside the function;
we first create a variable where we will put our resource link, we will the put the variable into our fetch element.
We then add a .then element that takes in response.json
We then add the element responsible for fetching our data, and since this data is inside an array we will use a forEach method which will iterate over all the data inside the server to give us the specific data we wanted.
we then add our error using a .catch element.

We then define a function that is responsible for holding our data.

**POST request**
We first create our first button that will have an eventListeber that will help in the creation of the Products.
The post request will help the sellers to be able to create a new product, and it will allow the customers in creating their reviews.

The procedure for a POST request is 
you first create your fetch request, followed by telling the server that its a post request by putting a method post, you then add headers and body that will turn your input into a JSON, you then add a promise response.

**PATCH request**
This requests alert the server to update something. In our web application we are updating the number of stocks available, for a patch request we have to specify the ID so that our server knows what we want to change.

We added an update button to each product so that when it is pressed it will reduce for that specific card.

**DELETE request**
As the name suggests this request alerts the server to permenently. For this request you also have to specify the id to tell the server which to delete specifically.
