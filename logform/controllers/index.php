<?php
include 'log.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DB {
    public static $link;

    public static function conn() {
         self::$link = mysqli_connect("localhost","rubz","donkey","users") or die("Error " . mysqli_error($link));
    }

    public static function newUser() {
        $username = $_REQUEST['user'];
        $password= $_REQUEST['password'];
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        lg($sql);
        $result = DB::$link->query($sql);
        return $result;
    }

    public static function checkUser() {
        $username = $_REQUEST['user'];
        $query = "SELECT username FROM users WHERE username = '$username'";
        $result = DB::$link->query($query);
        lg(json_encode($result));
        return $result->num_rows>0;
    }

    public static function checkLength() {
        $password = $_REQUEST['password'];
        if (strlen($password)<4) {
            DB::newUser();
        }
        else {
            echo json_encode(['msg' => "password must be at least 4 characters", 'success' => false]);
        }
    }
}

DB::conn();
if (!DB::checkUser()) { 
    DB::checkLength(); 
    //echo json_encode(['msg' => "user added" , 'success' => true]);
} else {
    echo json_encode(['msg' => "username already exists", 'success' => false]);
}

