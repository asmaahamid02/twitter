<?php
include("connection.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_POST['username']) && isset($_POST['publicity']) && (isset($_POST['tweet']) || isset($_POST['picture']))) {

    $username = $_POST['username'];
    $tweet = (isset($_POST['tweet']) ? $_POST['tweet'] : '');
    $is_public = $_POST['publicity'];

    $picture = (isset($_POST['picture']) ? $_POST['picture'] : '');

    $user = $connection->prepare("SELECT id FROM users WHERE username = ? ");
    $user->bind_param('s', $username);
    $user->execute();
    $result = $user->get_result();
    $row = $result->fetch_assoc();
    $user_id = $row['id'];


    $image = '';
    if ($picture != '') {
        $path = '../../app/assets/images/tweets_imgs/'; //path to insert image in host folder
        $saved_path = 'assets/images/tweets_imgs/'; //path to be saved
        list($type, $picture) = explode(';', $picture); //split the type of image from its url
        list(, $extension)          = explode('/', $type); //get the extension of the file by splitting the type (data:image/jpeg)
        list(, $picture)       = explode(',', $picture); //remove (base64) prefix
        $file_name                  = uniqid('te37am', true) . date('Y-m-d') . '.' . $extension; //define unique name for the image
        $base64string              = base64_decode($picture); //decode base64 string
        file_put_contents($path . $file_name, $base64string); //add image to the folder

        $image = $saved_path . $file_name; //path to be inserted in db
    }

    $created_at = date('Y-m-d H:i:s');
    $updated_at = date('Y-m-d H:i:s');
    // die($tweet);
    $user->close();
    $insert_query = $connection->prepare("INSERT INTO tweets (`user_id`,`tweet`,`picture`,`is_public`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?)");
    $insert_query->bind_param('ssssss', $user_id, $tweet, $image, $is_public, $created_at, $updated_at);
    $result_insert = $insert_query->execute() or die($insert_query->error);

    if ($result_insert) {
        $response['success'] = 'Tweeted Successfully';
    } else {
        $response['error'] = 'Something went wrong, try again!';
    }

    $insert_query->close();
} else {
    $response['error'] = 'No full data submitted';
}

echo json_encode($response);

$connection->close();