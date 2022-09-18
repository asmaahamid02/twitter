<?php
include_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    $sql = "SELECT u.`id`, u.`name`, u.`username`, u.`email`, u.`created_at` registered_at, p.* FROM `users` u LEFT JOIN `users_profiles` p ON u.`profile_id`= p.`id` WHERE u.`id` = ?";
    $query = $connection->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();

    $array = $query->get_result();

    $response = [];

    if ($array->num_rows > 0) {
        $response = $array->fetch_assoc();
    } else {
        $response['empty'] = "No Data Found";
    }

    $query->close();
}


echo json_encode($response);

$connection->close();