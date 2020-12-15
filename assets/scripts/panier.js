const showCart = () => {
	const table = document.querySelector("table");

	if (cart.length > 0) {
		table.innerHTML = `<thead>
		<td>Nom</td>
		<td>couleur</td>
		<td>prix unitaire</td>
		<td>Quantité</td>
		<td>Total</td>
		<td>supprimer l'article</td>
	</thead>`;
		for (const item of cart) {
			table.innerHTML += `<tr>
		<td>${item.name}</td>
		<td class=${item.color}>${item.color}</td>
		<td>${item.price}€</td>
		<td><button class="minus">-</button>  ${
			item.count
		} <button class='plus'>+</button></td>
		<td>${item.price * item.count}€</td>
		<td><button class="remove" id=${item._id}>Supprimer</button></td>
		</tr>`;
		}
		table.innerHTML += `<tr class="total-row">
		<td>Total</td>
		<td></td>
		<td></td>
		<td>${displayCount()[0]}</td>
		<td>${displayCount()[1]}€</td>
		<td><button id="delete-cart">Vider le panier</button></td>
		</tr>`;
	} else {
		table.innerHTML = "";
		table.innerHTML += "Le panier est vide...";
		table.className = "empty";
		document.querySelector("form").className = "hidden";
	}
};

const cartBtns = () => {
	const plusBtns = document.querySelectorAll(".plus");
	const minusBtns = document.querySelectorAll(".minus");

	for (const btn of plusBtns) {
		btn.addEventListener("click", () => {
			console.log("test");
			let id = btn.parentElement.parentElement.querySelector(".remove").id;

			for (const item of cart) {
				if (
					(id === item._id) &
					(item.color ===
						btn.parentElement.parentElement.children[1].textContent)
				) {
					item.count++;
					saveCart();
					showCart();
					cartLogic();
				}
			}
		});
	}
	for (const btn of minusBtns) {
		btn.addEventListener("click", () => {
			let id = btn.parentElement.parentElement.querySelector(".remove").id;
			for (const item in cart) {
				if (
					(id === cart[item]._id) &
					(cart[item].color ==
						btn.parentElement.parentElement.children[1].textContent)
				) {
					cart[item].count--;
					if (cart[item].count > 0) {
						saveCart();
						showCart();
					} else {
						cart.splice(item, 1);
						saveCart();
						showCart();
					}
				}
			}
			displayCount();
			cartLogic();
		});
	}
};

const removeItem = () => {
	const removeBtns = document.querySelectorAll(".remove");
	for (const btn of removeBtns) {
		let id = btn.parentElement.parentElement.querySelector(".remove").id;
		btn.addEventListener("click", () => {
			for (const item in cart) {
				if (
					(id === cart[item]._id) &
					(cart[item].color ===
						btn.parentElement.parentElement.children[1].textContent)
				) {
					try {
						cart.splice(item, 1);
						saveCart();
						showCart();
					} catch (error) {
						console.log(error);
					}
				}
			}
			saveCart();
			loadCart();
			displayCount();
			showCart();
			cartLogic();
		});
	}
};

const clearCart = () => {
	const deleteCart = document.querySelector("#delete-cart");

	try {
		deleteCart.addEventListener("click", () => {
			cart = [];
			console.log(cart);
			saveCart();
			loadCart();
			displayCount();
			showCart();
		});
	} catch (error) {
		console.log("le panier est vide");
	}
};

const cartLogic = () => {
	try {
		addToCart();
		clearCart();
		removeItem();
		cartBtns();
	} catch (error) {
		clearCart();
		removeItem();
		cartBtns();
	}
};

//send order

const myForm = document.querySelector("#myForm");

try {
	myForm.addEventListener("submit", function (event) {
		event.preventDefault();
		//contact
		let fd = new FormData(myForm);
		let object = {};
		fd.forEach(function (value, key) {
			object[key] = value;
		});

		//produits
		let products = [];
		cart.forEach(function (product) {
			products.push(product._id);
		});

		let contact = object;
		let order = { contact, products };

		fetch("http://localhost:3000/api/teddies/order", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(order),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let tempData = [displayCount()[1], data.orderId];
				document.location.href = `/confirmation.html?total=${tempData[0]}&orderId=${tempData[1]}`;
				return tempData;
			});
	});
} catch (error) {
	console.log(error);
}
//init

if (window.location.href.indexOf("panier") != -1) {
	loadCart();
	displayCount();
	showCart();
	cartLogic();
}
