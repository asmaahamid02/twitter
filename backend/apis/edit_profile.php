<?php
include("connection.php");
include_once "file_handeling.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_POST['id'])) {

    $id = $_POST['id'];
    $name = isset($_POST['full_name']) ? $_POST['full_name'] : '';
    $bio = isset($_POST['bio']) ? $_POST['bio'] : '';
    $location = isset($_POST['location']) ? $_POST['location'] : '';
    $website = isset($_POST['website']) ? $_POST['website'] : '';
    $profile = isset($_POST['profile']) ? $_POST['profile'] : '';
    $cover = isset($_POST['cover']) ? $_POST['cover'] : '';

    $profile_path = '';
    if ($profile != '') {
        $profile_img_data = convertToBase64($profile, '../../app/assets/images/profiles/', 'assets/images/profiles/');
        $profile_path = $profile_img_data['db_save'];
    }

    $cover_path = '';
    if ($cover != '') {
        $cover_img_data = convertToBase64($cover, '../../app/assets/images/covers/', 'assets/images/covers/');
        $cover_path = $cover_img_data['db_save'];
    }
    // die($profile_path);
    $created_at = date('Y-m-d H:i:s');
    $updated_at = date('Y-m-d H:i:s');

    $response = [];

    $sql = "SELECT u.`id`, p.`id` pid FROM `users` u JOIN `users_profiles` p ON u.`profile_id`= p.`id` WHERE u.`id` = ?";
    $query = $connection->prepare($sql);
    $query->bind_param("i", $id);
    $query->execute();

    $array = $query->get_result();



    $query->close();
    if ($array->num_rows == 1) {
        //edit data for users and users_profiles tables
        $array_fetch = $array->fetch_assoc();
        $profile_id = $array_fetch['pid'];

        $edit_user_sql = "UPDATE users SET `name` = ? WHERE `profile_id` = ? and `id` = ?";
        $edit_user_stmt = $connection->prepare($edit_user_sql);
        $edit_user_stmt->bind_param('sii', $name, $profile_id, $id);
        $edit_user_result = $edit_user_stmt->execute();
        $edit_user_stmt->close();

        $profile_sql = "UPDATE users_profiles SET `Biography` = ?, `location` = ?, `url` = ?, `profile_image_path` = ?, `cover_image_path` = ?, `updated_at` = ? WHERE `id` = ?";
        $profile_stmt = $connection->prepare($profile_sql);
        $profile_stmt->bind_param('ssssssi', $bio, $location, $website, $profile_path, $cover_path, $updated_at, $profile_id);
        $profile_result = $profile_stmt->execute();
        $profile_stmt->close();
    } else {
        // insert data , update users table
        // $profile_id = ?        
        $profile_sql = "INSERT INTO users_profiles (`Biography`,`location`,`url`,`profile_image_path`,`cover_image_path`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?)";
        $profile_stmt = $connection->prepare($profile_sql);
        $profile_stmt->bind_param('sssssss', $bio, $location, $website, $profile_path, $cover_path, $created_at, $updated_at);
        $profile_result = $profile_stmt->execute();
        $profile_id = $connection->insert_id;
        $profile_stmt->close();

        $edit_user_sql = "UPDATE users SET `name` = ?, `profile_id` = ? WHERE `id` = ?";
        $edit_user_stmt = $connection->prepare($edit_user_sql);
        $edit_user_stmt->bind_param('sii', $name, $profile_id, $id);
        $edit_user_result = $edit_user_stmt->execute();
        $edit_user_stmt->close();
    }

    if ($edit_user_result && $profile_result) {
        $response['success'] = 'Profile Update Successfully';
        if ($profile != '') {
            file_put_contents($profile_img_data['folder_save'], $profile_img_data['base64string']); //add image to the folder
        }
        if ($cover != '') {
            file_put_contents($cover_img_data['folder_save'], $cover_img_data['base64string']); //add image to the folder
        }
    } else {
        $response['error'] = 'Something went wrong, try again!';
    }
}


echo json_encode($response);

$connection->close();