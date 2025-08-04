<?php
header("Access-Control-Allow-Origin: *"); // or use your frontend origin like 'http://localhost'
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require './include/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

    $stmt = "select name from category where status = 1;";
    if($result = $conn->query($stmt)){
        $arr = array();
        while($row = $result->fetch_assoc()) {
            if (isset($row['name'])){
            array_push($arr, $row['name']);
            }
        }
        echo json_encode(['categories' => $arr]);
    }
    else{
       echo json_encode(['error' => 'something went wrong. Try again later']); 
    }
    exit();

?>