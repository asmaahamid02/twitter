<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include_once "connection.php";

$message = array();

if (isset($_POST['full_name']) && isset($_POST['email']) && isset($_POST['date_of_birth'])) {
    $full_name = $_POST['full_name'];
    $email = $_POST['email'];
    $date_of_birth = $_POST['date_of_birth'];

    $sql_email = "SELECT email FROM USERS WHERE email = ?";
    $stmt_email = $connection->prepare($sql_email);
    $stmt_email->bind_param('s', $email);
    $stmt_email->execute();

    if ($stmt_email->num_rows() > 0) {
        $message['error'] = 'Email already existed';

        $stmt_email->close();
    } else {
        $username = '';
        $username_splitted = str_split(trim($full_name), 7)[0];
        $sql_count_usernames = "SELECT COUNT(id) FROM users WHERE username LIKE ?";
        $stmt_count_usernames =  $connection->prepare($sql_count_usernames);
        $stmt_count_usernames->bind_param('s', '%' . $username_splitted . '%');
        $stmt_count_usernames->execute();
        $result = $stmt_count_usernames->get_result();

        $count = $result->fetch_assoc();
        if (!empty($count)) {
            $username = $username_splitted . $count;
        } else {
            $username = $username_splitted . str_split(strtotime(date('Y-m-d H:i:s')), 5)[1];
        }

        $sql_insert = "INSERT INTO users (name, username, email, birth_date) VALUES (?,?,?,?)";
        $stmt_insert =  $connection->prepare($sql_insert);
        $stmt_insert->bind_param('ssss', $full_name, $username, $email, date('Y-m-d', strtotime($date_of_birth)));
        $result_insert = $stmt_insert->execute();

        if ($result_insert) {
            $message['success'] = 'Registered Successfully!';
        } else {
            $message['error'] = 'Something went wrong, try again!';
        }
        $stmt_count_usernames->close();
        $stmt_insert->close();
    }
} else {
    $message['error'] = 'No full data submitted';
}

echo json_encode($message);


$connection->close();