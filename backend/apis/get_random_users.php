<?php
include_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_GET['id'])) {
    $user_id = $_GET['id'];

    $sql =
        "SELECT u.id, u.name, u.username, p.profile_image_path FROM users u
        LEFT JOIN users_profiles p ON p.id = u.profile_id
        LEFT JOIN friends f ON (f.user_id = u.id OR f.friend_id = u.id) AND f.is_deleted = 0
        LEFT JOIN blocked_users b ON (b.user_id = u.id OR b.blocked_user_id = u.id) AND b.is_deleted = 0 
        WHERE u.id != ? AND (f.user_id != ? OR f.user_id IS NULL) AND ((b.user_id != ? AND b.blocked_user_id!=?) OR b.user_id IS NULL) 
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