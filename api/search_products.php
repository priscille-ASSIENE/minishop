<?php
// Inclure la configuration de la base de données
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

$query = isset($_GET['q']) ? trim($_GET['q']) : '';

try {
    if ($query !== '') {
        // Recherche dans la base de données par nom ou description
        $stmt = $pdo->prepare("SELECT * FROM products WHERE nom LIKE ? OR description LIKE ?");
        $searchTerm = "%" . $query . "%";
        $stmt->execute([$searchTerm, $searchTerm]);
    } else {
        // Si la recherche est vide, récupérer tous les produits
        $stmt = $pdo->query("SELECT * FROM products");
    }

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Renvoyer les résultats en JSON
    echo json_encode($products);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>