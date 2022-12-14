<?php
include("connection.php");

header('Access-Control-Allow-Origin: *'); header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE'); header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$id = $_GET['id'];

$query = $mysqli->prepare("SELECT * FROM `profiles` WHERE `id` = (?)");
$query->bind_param("s", $id);
$query->execute();

$array = $query -> get_result();

$response = [];

while($i = $array -> fetch_assoc()){
    $response[] = $i;
}

echo json_encode($response);
