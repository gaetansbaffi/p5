const getProducts = async () => {
	await fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			for (const product of data) {
				addProduct(product);
			}

			showProducts(products);

			displayCount();
		})

		.catch(function (err) {
			console.log(err);
		});
};

const addProduct = (product) => {
	let tempProduct = {};
	tempProduct.id = product._id;
	tempProduct.imageUrl = product.imageUrl;
	tempProduct.name = product.name;
	tempProduct.price = product.price / 100;
	tempProduct.description = product.description;
	tempProduct.colors = product.colors;
	tempProduct.count = 0;
	products.push(tempProduct);

	return tempProduct;
};

const showProducts = (products) => {
	for (const product of products) {
		let productTemplate = `
		<div class="product-item">
		<h2>${product.name}</h2>
		<img src=${product.imageUrl}>
		<p>${product.price}€</p>
	<div class="product-btns">
			
			<a href="produit.html?product=${product.id}" class="more-info">Plus d'informations</a>
	</div>
		</div>
		`;
		app.innerHTML += productTemplate;
	}
	return app.innerHTML;
};

getProducts();
