<?php

$host = "localhost";
$db_user = "root";
$db_pass = '1234';
$db_name = "twitterdb";

$connection = new mysqli($host, $db_user, $db_pass, $db_name);

if ($connection->connect_error) {
    die('Connection failed: ' + $connection->connect_error);
}