const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url = "http://localhost:3000/api/teddies/";
let products = [];
let singleProduct = {};
let cart = [];
const app = document.getElementById("app");
let count = document.getElementById("item-amount");

