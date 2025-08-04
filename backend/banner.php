<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include database connection
require './include/db.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Base URL to prepend to relative image paths
$baseURL = "http://localhost:8001/SHOPPING/";

$stmt = "SELECT * FROM banner WHERE status = 1";
if ($result = $conn->query($stmt)) {
    $banners = [];

    while ($row = $result->fetch_assoc()) {
        // Normalize slashes in image path
        if (!empty($row['image'])) {
            $row['image'] = str_replace("\\", "/", $row['image']);

            // Prepend baseURL if not already a full URL
            if (strpos($row['image'], 'http') !== 0) {
               $row['image'] = $baseURL . $row['image'];
            }
        }
        $banners[] = $row;
    }

    echo json_encode(['banners' => $banners]);
} else {
    echo json_encode(['error' => 'Something went wrong. Try again later.']);
}

exit();
