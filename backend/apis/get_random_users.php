<?php
include_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_GET['id'])) {
    $user_id = $_GET['id'];

    $sql =
        "SELECT u.id, u.name, u.username, p.profile_image_path FROM users u
        LEFT JOIN profiles p ON p.id = u.profile_id
        LEFT JOIN friends f ON (f.user_id = u.id OR f.friend_id = u.id)
        LEFT JOIN blocks b ON (b.user_id = u.id OR b.blocked_user_id = u.id) 
        WHERE u.id != ? AND (f.user_id != ? or f.user_id is null)  and (b.user_id != ? or b.user_id is null) and (b.blocked_user_id != ?  or b.blocked_user_id is null) 
        ORDER BY rand()
        LIMIT 6
        ";

    $query = $connection->prepare($sql);
    $query->bind_param("iiii", $user_id, $user_id, $user_id, $user_id);
    $query->execute();

    $array = $query->get_result();

    $response = [];

    if ($array->num_rows > 0) {
        while ($i = $array->fetch_assoc()) {
            $response[] = $i;
        }
    } else {
        $response['empty'] = "No Data Found";
    }

    $query->close();
} else {
    $response['error'] = 'Missing user id!';
}

echo json_encode($response);

$connection->close();