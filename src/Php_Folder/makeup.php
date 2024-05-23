<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

$db_connect = mysqli_connect('localhost', 'root', '', 'eventhandling');
if (!$db_connect) {
    die('Connection Failed : ' . mysqli_connect_error());
}

// Log POST data for debugging
file_put_contents('post_data.log', print_r($_POST, true));

// Get the action from POST data
$method = $_POST['action'] ?? '';
file_put_contents('method.log', $method . PHP_EOL, FILE_APPEND);

if ($method == "upload makeup") {
    $name = $_POST['name'];
    $type = $_POST['type'];
    $rate = $_POST['rate'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $artistProfileImages = [];
    $samplePhotos = [];
    $uploadDir = '../makeup/';
    
    // Create the directory if it does not exist
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Handle artist profile images
    if (!empty($_FILES['artistProfileImages'])) {
        foreach ($_FILES['artistProfileImages']['tmp_name'] as $key => $tmp_name) {
            $fileName = uniqid() . '_' . basename($_FILES['artistProfileImages']['name'][$key]); // Append unique identifier to file name
            $uploadPath = $uploadDir . $fileName;
    
            if (move_uploaded_file($tmp_name, $uploadPath)) {
                $artistProfileImages[] = $fileName;
            } else {
                echo json_encode([
                    "statusCode" => 201,
                    "message" => "Failed to move uploaded artist profile image"
                ]);
                exit();
            }
        }
    }
    
    // Handle sample photos
    if (!empty($_FILES['samplePhotos'])) {
        foreach ($_FILES['samplePhotos']['tmp_name'] as $key => $tmp_name) {
            $fileName = uniqid() . '_' . basename($_FILES['samplePhotos']['name'][$key]); // Append unique identifier to file name
            $uploadPath = $uploadDir . $fileName;
    
            if (move_uploaded_file($tmp_name, $uploadPath)) {
                $samplePhotos[] = $fileName;
            } else {
                echo json_encode([
                    "statusCode" => 201,
                    "message" => "Failed to move uploaded sample photo"
                ]);
                exit();
            }
        }
    }

    $artistProfileImagesStr = implode(',', $artistProfileImages);
    $samplePhotosStr = implode(',', $samplePhotos);

    // Insert makeup details into the database
    $sql = "INSERT INTO makeup (name, type, rate, description, price, artist_profile_images, sample_photos) 
            VALUES ('$name', '$type', '$rate', '$description', '$price', '$artistProfileImagesStr', '$samplePhotosStr')";

    if (mysqli_query($db_connect, $sql)) {
        echo json_encode(["data" => "200", 'message' => 'Upload Successful']);
    } else {
        echo json_encode(['message' => 'Failed to upload makeup details']);
    }
} elseif ($method == "retrieve") {
    // echo "working";
    $sql = "SELECT * FROM makeup";
    $result = mysqli_query($db_connect, $sql);

    $makeupDetails = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $makeupDetails[] = $row;
    }

    if (count($makeupDetails) > 0) {
        $res = [
            "data" => $makeupDetails,
            "message" => "retrieve successfully"
        ];
        echo json_encode($res);
    } else {
        echo json_encode(['data' => [], 'message' => 'No data found']);
    }
} 
else if(true)
{
    echo "working";
    $id = $_POST['id'];

    // First, retrieve the image paths from the database
    $sql = "SELECT artist_profile_images, sample_photos FROM makeup WHERE id = '$id'";
    $result = mysqli_query($db_connect, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $artistProfileImages = explode(',', $row['artist_profile_images']); // Assuming comma-separated values
        $samplePhotos = explode(',', $row['sample_photos']); // Assuming comma-separated values

        // Function to unlink images
        function unlinkImages($images) {
            foreach ($images as $image) {
                $filePath = "../src/makeup/" . trim($image);
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
            }
        }

        // Unlink artist profile images
        unlinkImages($artistProfileImages);

        // Unlink sample photos
        unlinkImages($samplePhotos);

        // Now proceed to delete the record from the database
        $sql = "DELETE FROM makeup WHERE id = '$id'";
        if (mysqli_query($db_connect, $sql)) {
            echo json_encode(["data" => "200", 'message' => 'Delete Successful']);
        } else {
            echo json_encode(['message' => 'Failed to delete makeup details']);
        }
    } else {
        echo json_encode(['message' => 'Record not found']);
    }
}
else {
    echo json_encode(["message" => "not found"]);
}

mysqli_close($db_connect);
?>
