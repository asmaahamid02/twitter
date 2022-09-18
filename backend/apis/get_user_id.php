<?php
include("connection.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_POST['username'])) {
    $username = $_POST['username'];

    $sql = "SELECT u.`id` FROM `users` u  WHERE u.`username` = ?";
    $query = $connection->prepare($sql);
    $query->bind_param("s", $username);
    $query->execute();

    $array = $query->get_result();

    $response = [];

    if ($array->num_rows > 0) {
        $row = $array->fetch_assoc();
        $response['success'] = $row['id'];
    } else {
        $response['empty'] = "No Data Found";
    }

    $query->close();
}


echo json_encode($response);

$connection->close();