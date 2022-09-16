<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');

include_once "connection.php";

$message = array();

if (isset($_POST['password']) && isset($_POST['email_username'])) {
    $email_username = $_POST['email_username'];
    $password = hash('sha256', $_POST['password']) . 'te27am';

    //check the existence of the data
    $sql = "SELECT email,username,password FROM users WHERE (email = ? OR username = ?) AND password = ?";
    $stmt = $connection->prepare($sql);
    $stmt->bind_param('sss', $email_username, $email_username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $message['success'] = 'LogedIn Successfully!';
        $message['user_data'] = [
            'username' => $row['username'],
            'email' => $row['email'],
            'password' => $row['password'],
        ];
    }
    $stmt->close();
} else {
    $message['error'] = 'No full data submitted';
}

echo json_encode($message);

//close connection
$connection->close();