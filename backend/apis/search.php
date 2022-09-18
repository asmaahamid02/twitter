<?php
include("connection.php");

header('Access-Control-Allow-Origin: *'); header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE'); header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

$search = $_GET['search'];

$query = $mysqli->prepare("SELECT * FROM `users` WHERE `username` LIKE (?) OR `name` LIKE (?)");
$query->bind_param("ss", $search, $search);
$query->execute();

$array = $query -> get_result();

$response = [];

while($i = $array -> fetch_assoc()){
    $response[] = $i;
}

echo json_encode($response);

?>