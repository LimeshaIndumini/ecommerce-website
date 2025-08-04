<?php
$conn = new mysqli("localhost:3307", "root","","eshop");
if($conn->connect_error) {
    echo json_encode(['error' =>  $conn->connect_error]);
    exit();
}