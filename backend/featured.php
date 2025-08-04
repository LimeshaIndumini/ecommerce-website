<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require './include/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$stmt = "SELECT * FROM product WHERE status = 1 ORDER BY RAND() LIMIT 3;";

$baseURL = "http://localhost:8001/SHOPPING/";

if ($result = $conn->query($stmt)) {
    $arr = array();
    while ($rowArray = $result->fetch_assoc()) {
        $image = str_replace("\\", "/", $rowArray['image']); // normalize slashes
        $image = ltrim($image, '/'); // remove leading slash if any

        // Only add base URL if not already a full URL
        if (!preg_match('/^https?:\/\//', $image)) {
            $image = $baseURL . $image;
        }

        $rowArray['image'] = $image;
        $arr[] = $rowArray;
    }
    echo json_encode(['featured' => $arr]);
} else {
    echo json_encode(['error' => 'Something went wrong. Try again later.']);
}

