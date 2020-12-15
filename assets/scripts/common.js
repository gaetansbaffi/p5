// Save cart
function saveCart() {
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Load cart
function loadCart() {
	cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
if (localStorage.getItem("shoppingCart") != null) {
	loadCart();
}

const displayCount = () => {
	let amount = 0;
	let total = 0;
	for (const item of cart) {
		amount += item.count;
		total += item.count * item.price;
	}
	count.innerHTML = amount;
	return [amount, total];
};
