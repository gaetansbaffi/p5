const confirmation = () => {
	try {
		if (urlParams.get("orderId")) {
			document.querySelector(
				"section"
			).innerHTML = `<h2>Merci de votre commande</h2>
<p>Votre numéro de commande est le: <br> <span class="orderId">${urlParams.get(
				"orderId"
			)}</span></p>
<p>La valeur totale de votre commande est de:<br> <span class="total">${urlParams.get(
				"total"
			)}€</span></p>
<button class="backHome" ><a href="/index.html">retour à la page d'acceuil</a></button>`;
			cart = [];
		} else {
			document.querySelector(
				"section"
			).innerHTML = `<p>Vous n'avez pas de commande en cours</p>
<button class="backHome" ><a href="/index.html">retour à la page d'acceuil</a></button>`;
		}
		saveCart();
		loadCart();
		displayCount();
	} catch (error) {}
};

confirmation();
