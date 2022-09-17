<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include_once "connection.php";

$message = array();

if (isset($_POST['full_name']) && isset($_POST['email']) && isset($_POST['date_of_birth']) && isset($_POST['password'])) {
    //get the posted data
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $date_of_birth = date('Y-m-d', strtotime($_POST['date_of_birth']));
    $password = $_POST['password'];

    // check the existence of the email
    $sql_email = "SELECT email FROM users WHERE email = ?";
    $stmt_email = $connection->prepare($sql_email);
    $stmt_email->bind_param('s', $email);
    $stmt_email->execute();
    $result_email = $stmt_email->get_result();

    if ($result_email->num_rows > 0) {
        $message['error'] = 'Email already existed';

        $stmt_email->close();
    } else {
        //generate a unique username

        //close statement
        $stmt_email->close();

        $username = '';
        $combined_full_name = str_replace(' ', '', $full_name);
        $username_splitted = str_split($combined_full_name, 7)[0];

        $sql_count_usernames = "SELECT COUNT(id) as users_count FROM users WHERE username LIKE ?";
        $stmt_count_usernames = $connection->prepare($sql_count_usernames);

        $like_param = '%' . $username_splitted . '%';

        $stmt_count_usernames->bind_param('s', $like_param);
        $stmt_count_usernames->execute();
        $result = $stmt_count_usernames->get_result();
        $count = $result->fetch_assoc();

        if (!empty($count)) {
            $username = $username_splitted . $count['users_count'] . substr(strtotime(date('Y-m-d H:i:s')), -3);
        } else {
            $username = $username_splitted . substr(strtotime(date('Y-m-d H:i:s')), -6);
        }

        $hashed_pass = hash('sha256', $password);
        $hashed_pass .= 'te27am';

        //close statement
        $stmt_count_usernames->close();

        //insert new user
        $sql_insert = "INSERT INTO users (name, username, email,password, birth_date) VALUES (?,?,?,?,?)";
        $stmt_insert =  $connection->prepare($sql_insert);
        $stmt_insert->bind_param('sssss', $full_name, $username, $email, $hashed_pass, $date_of_birth);
        $result_insert = $stmt_insert->execute(); // or die($stmt_insert->error);

        if ($result_insert) {
            $message['success'] = 'Registered Successfully!';
            $message['user_data'] = [
                'username' => $username,
                'email' => $email,
                'password' => $hashed_pass,
            ];
        } else {
            $message['error'] = $stmt_insert->error;
            // die($message['error']);
        }

        //close statement
        $stmt_insert->close();
    }
} else {
    $message['error'] = 'No full data submitted';
}

echo json_encode($message);

//close connection
$connection->close();