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
document.addEventListener('DOMContentLoaded', () => {
    // 1. On cible les éléments HTML (sur les pages de votre coéquipière Chloe)
    const searchInput = document.querySelector('#search-input');
    const productsContainer = document.querySelector('#products-container');

    if (searchInput) {
        // 2. On écoute ce que l'utilisateur tape dans la barre de recherche
        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.trim();

            if (query.length < 2) {
                return; // Ne recherche pas si moins de 2 caractères
            }

            try {
                // 3. Appel vers l'API PHP de recherche
                const response = await fetch(`API/search_products.php?q=${encodeURIComponent(query)}`);
                const products = await response.json();

                // 4. Affichage dynamique des résultats dans la page
                if (productsContainer) {
                    productsContainer.innerHTML = '';
                    if (products.length > 0) {
                        products.forEach(product => {
                            productsContainer.innerHTML += `
                                <div class="product-card">
                                    <h3>${product.nom || product.name}</h3>
                                    <p>${product.prix || product.price} €</p>
                                </div>
                            `;
                        });
                    } else {
                        productsContainer.innerHTML = '<p>Aucun produit trouvé.</p>';
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la recherche :', error);
            }
        });
    }
});