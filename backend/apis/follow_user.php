<?php
include_once "connection.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_POST['user_id']) && isset($_POST['other_id'])) {

    $user_id = $_POST['user_id'];
    $other_id = $_POST['other_id'];
    $created_at = date('Y-m-d H:i:s');
    $updated_at = date('Y-m-d H:i:s');

    $response = [];

    $check_follow = "SELECT f.`id`, f.`is_deleted` FROM `friends` f WHERE f.`user_id` = ? AND f.`friend_id` = ?";
    $check_follow_query = $connection->prepare($check_follow);
    $check_follow_query->bind_param("ii", $user_id, $other_id);
    $check_follow_query->execute();
    $follow_result = $check_follow_query->get_result();
    $check_follow_query->close();

    if ($follow_result->num_rows == 1) {
        //update existing like
        $row = $follow_result->fetch_assoc();
        if ($row['is_deleted'] == 1) {
            $update_follow = "UPDATE `friends`  SET `is_deleted` = 0, `updated_at` = '" . $updated_at . "'  WHERE id = " . $row['id'];
        } else {
            $update_follow = "UPDATE `friends`  SET `is_deleted` = 1, `updated_at` = '" . $updated_at . "'  WHERE id = " . $row['id'];
        }
        $result = $connection->query($update_follow);
    } else {
        //insert new friendship
        $insert_sql = "INSERT INTO `friends` (`user_id`, `friend_id`, `created_at`, `updated_at`) VALUES (?,?,?,?)";
        $insert_query = $connection->prepare($insert_sql);
        $insert_query->bind_param("iiss", $user_id, $other_id, $created_at, $updated_at);
        $insert_query->execute();
        $result = $insert_query->get_result();
        $insert_query->close();
    }
    if ($result) {
        $response['success'] = true;
    } else {
        $response['error'] = 'Something wenrt wrong, Try again!';
    }
} else {
    $response['error'] = "No enough data submitted";
}

echo json_encode($response);

$connection->close();