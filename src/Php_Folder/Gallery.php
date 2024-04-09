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

if(isset($_FILES['image'])) {
    $image = $_FILES['image'];

    // Check if the file was uploaded without errors
    if ($image['error'] === UPLOAD_ERR_OK) {
        $tempName = $image['tmp_name'];
        $fileName = $image['name'];
        // Specify the directory where you want to store the uploaded images
        $uploadDirectory = '../Gallery_Images/';
        $storedFile = $uploadDirectory . $fileName;
        // Move the uploaded file to the desired directory
        if (move_uploaded_file($tempName, $storedFile)) {
            $sql = "INSERT INTO gallery (image) VALUES ('$fileName')";
            $result = mysqli_query($db_connect, $sql);
            if ($result) {
                $res=[
                    "status" => 200,
                    "message" => "Image uploaded successfully."
                ];
            } else {
                $res=[
                    "status" => 500,
                    "message" => "Failed to upload image."
                ];
            }
        } else {
            $res=[
                "status" => 500,
                "message" => "Error uploading file."
            ];
        }
        echo json_encode($res);
    } else {
        echo json_encode(array("status" => 500, "message" => "Error uploading file. Error code: " . $image['error']));
    }
} 

?>
