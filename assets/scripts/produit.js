const showSingleProduct = async (product) => {
	if (urlParams.get("product")) {
		await fetch(url + urlParams.get("product"))
			.then((response) => response.json())
			.then(function (data) {
				const colorsList = (colors) => {
					let tempStr = "";
					for (color of colors) {
						tempStr += `<option value="${color}">${color}</option>`;
					}
					return tempStr;
				};
				let productTemplate = `
<div class="single-product-item">
<h2>${data.name}</h2>
<img src=${data.imageUrl}
<p>${data.description}</p>
<p>${data.price / 100}€</p>
	
<select>${colorsList(data.colors)}</select>
<button class="add-basket" id=${data._id}>Ajouter au panier</button>
	
</div>
`;

				singleProduct = data;
				singleProduct.price = data.price / 100;
				singleProduct.count = 0;

				app.innerHTML += productTemplate;
			});
		addToCart();
		displayCount();
	} else {
		document.location.href = "/p5/index.html";
	}
};

const addToCart = () => {
	console.log("fonction appelée");
	let button = document.querySelector("button");

	button.addEventListener("click", () => {
		let color = document.querySelector("select").value;
		console.log(color);

		const line = cart.find(
			(item) => (item._id == button.id) & (item.color == color)
		);
		if (line === undefined) {
			singleProduct.color = color;

			singleProduct.count = 1;
			cart.push(singleProduct);
		} else {
			line.count++;
		}

		saveCart();
		displayCount();
		document.location.href = "/p5/index.html";
	});
};

showSingleProduct();
