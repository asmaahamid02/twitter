<?php
include("connection.php");

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

if (isset($_GET['id'])) {
    $user_id = $_GET['id'];
    $sql =
        "SELECT * FROM(
            SELECT t.*, u.name, u.username, p.profile_image_path FROM tweets AS t
            INNER JOIN users u ON u.id = t.user_id
            LEFT JOIN users_profiles p ON p.id = u.profile_id
            WHERE u.id != ? AND is_public = 1
            union 
            SELECT t.*, u.name, u.username, p.profile_image_path FROM tweets t
            INNER JOIN users u ON u.id = t.user_id
            INNER JOIN friends f ON f.friend_id = t.user_id
            LEFT JOIN users_profiles p ON p.id = u.profile_id
            WHERE f.user_id = ? -- and is_public = 1
        ) as main 
        ORDER BY  main.created_at DESC, main.id DESC";

    $query = $connection->prepare($sql);
    $query->bind_param('ss', $user_id, $user_id);
    $query->execute();

    $array = $query->get_result();

    $response['num'] = $array->num_rows;

    if($array->num_rows >0){
        while ($i = $array->fetch_assoc()) {
            $response['tweet_info'][] = $i;
        }
    }else{
        $response['empty'] = "No Data Found";
    }
    
    $query->close();
}

//returns a response with ["tweet_id","tweet_user_id","tweet","tweet_picture","is_public_tweet","tweet_created_at","tweet_updated_at","name","username","profile_image_path"]
//all the fields same as the names in th db, "tweet" keyword for more declaration
echo json_encode($response);

$connection->close();