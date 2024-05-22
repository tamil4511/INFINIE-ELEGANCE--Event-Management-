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
$method = isset($data['action']) ? $data['action'] : null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'upload_dj') {
    if (isset($_POST['title']) && isset($_POST['description']) && isset($_POST['price'])) {
        $title = $_POST['title'];
        $description = $_POST['description'];
        $price = $_POST['price'];

        $uploadDir = '../DJ-images/';
        $imagePaths = [];

        if (!empty($_FILES['images']['tmp_name'][0])) {
            foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
                $fileName = uniqid() . '_' . basename($_FILES['images']['name'][$key]);
                $uploadPath = $uploadDir . $fileName;

                if (move_uploaded_file($_FILES['images']['tmp_name'][$key], $uploadPath)) {
                    $imagePaths[] = $fileName;
                } else {
                    $res = [
                        "statusCode" => 201,
                        "message" => "Failed to move uploaded file"
                    ];
                    echo json_encode($res);
                    exit();
                }
            }
        }

        $imagePathsString = implode(",", $imagePaths);
        $sql = "INSERT INTO dj (title, description, price, images) VALUES ('$title', '$description', '$price', '$imagePathsString')";
        $result = mysqli_query($db_connect, $sql);

        if ($result) {
            $res = [
                "statusCode" => 200,
                "message" => "DJ Uploaded Successfully"
            ];
        } else {
            $res = [
                "statusCode" => 201,
                "message" => "Failed to Upload DJ"
            ];
        }
        echo json_encode($res);
    } else {
        $res = [
            "statusCode" => 400,
            "message" => "Missing required parameters"
        ];
        echo json_encode($res);
    }
} elseif ($method === "retrieve_dj") {
    $sql = "SELECT * FROM dj";
    $result = mysqli_query($db_connect, $sql);
    $dj = mysqli_num_rows($result);
    if ($dj > 0) {
        $dj = mysqli_fetch_all($result, MYSQLI_ASSOC);
        $res = [
            "statusCode" => 200,
            "message" => "DJ Retrieved Successfully",
            "data" => $dj
        ];
    } else {
        $res = [
            "statusCode" => 201,
            "message" => "Failed to Retrieve DJ",
            "data" => []
        ];
    }
    echo json_encode($res);
} elseif ($method === "delete_dj") {
    if (isset($data['id'])) {
        $id = $data['id'];
        $sql = "DELETE FROM dj WHERE id = '$id'";
        $result = mysqli_query($db_connect, $sql);
        if ($result) {
            $res = [
                "statusCode" => 200,
                "message" => "DJ Deleted Successfully"
            ];
        } else {
            $res = [
                "statusCode" => 201,
                "message" => "Failed to Delete DJ"
            ];
        }
        echo json_encode($res);
    } else {
        $res = [
            "statusCode" => 400,
            "message" => "Missing required parameters"
        ];
        echo json_encode($res);
    }
} 
$method = $_POST['action'] ?? '';
if ($method == "edit_dj") {
    $id = $_POST['id'] ?? '';
    $price = $_POST['price'] ?? '';
    $description = $_POST['description'] ?? '';
    $title = $_POST['title'] ?? '';
    $images = $_FILES['images']['name'] ?? []; // Array of uploaded image filenames
    // Folder where images will be stored
    $uploadDir = '../DJ-Images/';

    // Check if any of the fields are not empty
    if (!empty($id) && (!empty($price) || !empty($description) || !empty($title) || !empty($images))) {
        // Check if images are uploaded
        if (!empty($images)) {
            // Fetch existing images from the database
            $sql_select_images = "SELECT images FROM dj WHERE id='$id'";
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
        } else {
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
        $sql = "UPDATE dj SET " . implode(", ", $updateFields) . " WHERE id='$id'";

        // Execute the update query
        $result = mysqli_query($db_connect, $sql);
        if ($result) {
            $res = [
                "statusCode" => 200,
                "message" => "DJ Package Updated Successfully"
            ];
        } else {
            $res = [
                "statusCode" => 201,
                "message" => "Failed to Update DJ Package"
            ];
        }
    } else {
        $res = [
            "statusCode" => 201,
            "message" => "No fields provided for update"
        ];
    }
    return json_encode($res);
}


?>
