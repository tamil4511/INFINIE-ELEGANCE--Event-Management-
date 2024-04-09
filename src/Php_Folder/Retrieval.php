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

if ($method == "users-retrieval") {
    $sql = "SELECT * FROM users";
    $result = mysqli_query($db_connect, $sql);
    $users = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
        $res=[
            "status"=>"200",
            "message"=>"Users Found",
            "users"=>$users
        ];
    } else {
        $res=[
            "status"=>"400",
            "message"=>"No Users Found",
            "users"=>[]
        ];
    }
    echo json_encode($res);
}

if ($method == "delete-user") {
    $id = $data['id'];
    $sql = "DELETE FROM users WHERE id='$id'";
    if (mysqli_query($db_connect, $sql)) {
        $res=[
            "status"=>"200",
            "message"=>"User Deleted"
        ];
    } else {
        $res=[
            "status"=>"400",
            "message"=>"User Not Found"
        ];
    }
    echo json_encode($res);
}
if($method == "gallery-retrieval")
{
    $sql = "SELECT * FROM gallery";
    $result = mysqli_query($db_connect, $sql);
    $gallery = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $gallery[] = $row;
        }
        $res=[
            "status"=>"200",
            "message"=>"Gallery Found",
            "images"=>$gallery
        ];
    } else {
        $res=[
            "status"=>"400",
            "message"=>"No Gallery Found",
            "images"=>[]
        ];
    }
    echo json_encode($res);
}
if($method == "delete-image")
{
    $id=$data['id'];
    $sql = "SELECT * FROM gallery WHERE id='$id'";
    $result = mysqli_query($db_connect, $sql);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $fileName = $row['image'];
        $sql = "DELETE FROM gallery WHERE id='$id'";
        if (mysqli_query($db_connect, $sql)) {
            $uploadDirectory = '../Gallery_Images/';
            $storedFile = $uploadDirectory . $fileName;
            if (file_exists($storedFile)) {
                unlink($storedFile);
            }
            $res=[
                "status"=>"200",
                "message"=>"Image Deleted"
            ];
        } else {
            $res=[
                "status"=>"400",
                "message"=>"Image Not Found"
            ];
        }
        echo json_encode($res);
    } else {
        $res=[
            "status"=>"400",
            "message"=>"Image Not Found"
        ];
        echo json_encode($res);
    }
}

if($method=="stage-decoration-retrieval")
{
    $sql = "SELECT * FROM stageDecoration";
    $result = mysqli_query($db_connect, $sql);
    $stageDecoration = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $stageDecoration[] = $row;
        }
        $res=[
            "status"=>"200",
            "message"=>"Stage Decoration Found",
            "stageDecoration"=>$stageDecoration
        ];
    } else {
        $res=[
            "status"=>"400",
            "message"=>"No Stage Decoration Found",
            "stageDecoration"=>[]
        ];
    }
    echo json_encode($res);
}
if($method=="delete-stage-decoration")
{
    $id=$data['id'];
    // echo "working";
    // echo $id;
    // First, fetch the images associated with the stage decoration
    $sql_select_images = "SELECT images FROM stageDecoration WHERE id = '$id'";
    $result_select_images = mysqli_query($db_connect, $sql_select_images);
    if ($result_select_images && mysqli_num_rows($result_select_images) > 0) {
        $row = mysqli_fetch_assoc($result_select_images);
        $images = explode(',', $row['images']);
        
        // Delete the stage decoration from the database
        $sql_delete_stage_decoration = "DELETE FROM stageDecoration WHERE id = '$id'";
        $result_delete_stage_decoration = mysqli_query($db_connect, $sql_delete_stage_decoration);

        // Unlink each image from the gallery folder
        foreach ($images as $image) {
            $image_path = "../StageDecorationImages/$image"; // Adjust the path as needed
            if (file_exists($image_path)) {
                unlink($image_path);
            }
        }

        if ($result_delete_stage_decoration) {
            $res = [
                "statusCode" => 200,
                "message" => "Stage Decoration and Associated Images Deleted Successfully"
            ];
        } else {
            $res = [
                "statusCode" => 201,
                "message" => "Failed to Delete Stage Decoration"
            ];
        }
    } else {
        $res = [
            "statusCode" => 404,
            "message" => "Stage Decoration Not Found"
        ];
    }
    echo json_encode($res);
}
?>
