<?php
include_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_GET['id'])) {
    $user_id = $_GET['id'];

    $sql =
        "SELECT t.*, u.name, u.username, p.profile_image_path FROM tweets AS t
        INNER JOIN users u ON u.id = t.user_id
        LEFT JOIN users_profiles p ON p.id = u.profile_id
        WHERE u.id = ? ORDER BY t.created_at desc";

    $query = $connection->prepare($sql);
    $query->bind_param("i", $user_id);
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