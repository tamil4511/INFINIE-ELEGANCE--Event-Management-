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
file_put_contents('post_data.log', print_r($_POST, true)); // Add this line before checking $method

$method = $_POST['action'] ?? '';
if ($method == "stage-decoration-upload") {
    $price = $_POST['price'] ?? '';
    $description = $_POST['description'] ?? '';
    $title = $_POST['title'] ?? '';

    // Folder where images will be stored
    $uploadDir = '../StageDecorationImages/';

    // Array to store uploaded image paths
    $imagePaths = [];

    // Loop through each uploaded file
    foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
        // Generate unique filename to prevent overwriting
        $fileName = uniqid() . '_' . basename($_FILES['images']['name'][$key]);
        $uploadPath = $uploadDir . $fileName;

        // Move the uploaded file to the specified location
        if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $uploadPath)) {
            // Store the image path in the array
            $imagePaths[] = $fileName;
        } else {
            // If file upload failed, return error message
            $res = [
                "statusCode" => 201,
                "message" => "Failed to move uploaded file"
            ];
            echo json_encode($res);
            exit();
        }
    }

    // Prepare a string of image paths separated by commas
    $imagePathsString = implode(",", $imagePaths);

    $sql = "INSERT INTO stageDecoration (title, description, price, images) VALUES ('$title', '$description', '$price', '$imagePathsString')";
    $result = mysqli_query($db_connect, $sql);
    if ($result) {
        $res = [
            "statusCode" => 200,
            "message" => "Stage Decoration Uploaded Successfully"
        ];
    } else {
        $res = [
            "statusCode" => 201,
            "message" => "Failed to Upload Stage Decoration"
        ];
    }
    echo json_encode($res);
}
if ($method == "update-stage-decoration") {
    $id = $_POST['id'] ?? '';
    $price = $_POST['price'] ?? '';
    $description = $_POST['description'] ?? '';
    $title = $_POST['title'] ?? '';
    $images = $_FILES['images']['name'] ?? []; // Array of uploaded image filenames

    // Folder where images will be stored
    $uploadDir = '../StageDecorationImages/';

    // Check if any of the fields are not empty
    if (!empty($id) && (!empty($price) || !empty($description) || !empty($title) || !empty($images))) {
        // Check if images are uploaded
        if (!empty($images)) {
            // Fetch existing images from the database
            $sql_select_images = "SELECT images FROM stageDecoration WHERE id='$id'";
            $result_select_images = mysqli_query($db_connect, $sql_select_images);
            if ($result_select_images) {
                $row = mysqli_fetch_assoc($result_select_images);
                $existingImages = explode(",", $row['images']);
                
                // Unlink existing images from the folder
                foreach ($existingImages as $existingImage) {
                    if (!empty($existingImage)) {
                        $filePath = $uploadDir . $existingImage;
                        if (file_exists($filePath)) {
                            unlink($filePath);
                        }
                    }
                }
            } else {
                // If unable to fetch existing images, return error message
                $res = [
                    "statusCode" => 201,
                    "message" => "Failed to fetch existing images"
                ];
                echo json_encode($res);
                exit();
            }
        
            // Array to store uploaded image paths
            $imagePaths = [];
        
            // Loop through each uploaded file
            foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
                // Generate unique filename to prevent overwriting
                $fileName = uniqid() . '_' . basename($_FILES['images']['name'][$key]);
                $uploadPath = $uploadDir . $fileName;
        
                // Move the uploaded file to the specified location
                if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $uploadPath)) {
                    // Store the image path in the array
                    $imagePaths[] = $fileName;
                } else {
                    // If file upload failed, return error message
                    $res = [
                        "statusCode" => 201,
                        "message" => "Failed to move uploaded file"
                    ];
                    echo json_encode($res);
                    exit();
                }
            }
        
            // Prepare a string of image paths separated by commas
            $imagePathsString = implode(",", $imagePaths);
        }
         else {
            // If no new images uploaded, use the existing images path
            $imagePathsString = $_POST['existing_images'] ?? '';
        }

        // Construct the update query for non-empty fields
        $updateFields = [];
        if (!empty($price)) {
            $updateFields[] = "price='$price'";
        }
        if (!empty($description)) {
            $updateFields[] = "description='$description'";
        }
        if (!empty($title)) {
            $updateFields[] = "title='$title'";
        }
        if (!empty($imagePathsString)) {
            $updateFields[] = "images='$imagePathsString'";
        }

        // Combine the update fields into the SQL query
        $sql = "UPDATE stageDecoration SET " . implode(", ", $updateFields) . " WHERE id='$id'";

        // Execute the update query
        $result = mysqli_query($db_connect, $sql);
        if ($result) {
            $res = [
                "statusCode" => 200,
                "message" => "Stage Decoration Updated Successfully"
            ];
        } else {
            $res = [
                "statusCode" => 201,
                "message" => "Failed to Update Stage Decoration"
            ];
        }
    } else {
        // Return an error response if no fields are provided or if all are empty
        $res = [
            "statusCode" => 201,
            "message" => "No fields provided for update"
        ];
    }
    echo json_encode($res);
}


?>


