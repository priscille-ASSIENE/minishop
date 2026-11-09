document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const productsContainer = document.getElementById('products-container');

    // Vérifier si l'input de recherche existe sur la page actuelle
    if (searchInput && productsContainer) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();

            // Appel AJAX via Fetch API vers le fichier de recherche
            fetch(`api/search_products.php?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    productsContainer.innerHTML = ''; // Vider le conteneur

                    if (data.length === 0) {
                        productsContainer.innerHTML = '<p class="no-result">Aucun produit trouvé.</p>';
                        return;
                    }

                    // Générer dynamiquement l'affichage des produits
                    data.forEach(product => {
                        const productCard = `
                            <div class="product-card">
                                <img src="public/uploads/${product.image}" alt="${product.nom}">
                                <h3>${product.nom}</h3>
                                <p class="price">${product.prix} €</p>
                                <button class="btn-add" data-id="${product.id}">Ajouter au panier</button>
                            </div>
                        `;
                        productsContainer.innerHTML += productCard;
                    });
                })
                .catch(error => console.error('Erreur lors de la recherche :', error));
        });
    }
});