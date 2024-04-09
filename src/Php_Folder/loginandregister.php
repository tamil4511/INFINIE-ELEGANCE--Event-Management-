<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

$db_connect = mysqli_connect('localhost', 'root', '', 'eventhandling');
if (!$db_connect) {
    die('Connection Failed : ' . mysqli_connect_error());
}

$data = json_decode(file_get_contents('php://input'), true);
$method = $data['action'];
if($method == "login"){
    $email = $data['email'];
    $password = $data['password'];
    $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    $result = mysqli_query($db_connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $res=[
            "status"=>"200",
            "message"=>"Login Successful"
        ];
    } else {
        $res=[
            "status"=>"400",
            "message"=>"Login Failed"
        ];
    }
    echo json_encode($res);
}
if($method == "register"){
    $username = $data['username'];
    $email = $data['email'];
    $password = $data['password'];
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    if (mysqli_query($db_connect, $sql)) {
        $res=[
            "status"=>"200",
            "message"=>"Registration Successful"
        ];
    } else {
        $res=[
            "status"=>"400",
            "message"=>"Registration Failed"
        ];
    }
    echo json_encode($res);
}
?>