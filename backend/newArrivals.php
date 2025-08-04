<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require './include/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$stmt = "SELECT * FROM product WHERE status = 1 ORDER BY added_on DESC LIMIT 3;";
$baseURL = "http://localhost:8001/SHOPPING/";

if ($result = $conn->query($stmt)) {
    $arr = array();
    while ($rowArray = $result->fetch_assoc()) {
        $image = str_replace("\\", "/", $rowArray['image']);
        $image = rtrim($baseURL, '/') . '/' . ltrim($image, '/');
        $rowArray['image'] = $image;
        $arr[] = $rowArray;
    }
    echo json_encode(['newArrivals' => $arr]);
} else {
    error_log("MySQL Error: " . $conn->error);
    http_response_code(500);
    echo json_encode(['error' => 'Something went wrong. Try again later.']);
}
