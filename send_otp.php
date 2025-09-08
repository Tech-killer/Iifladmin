<?php
// ------------------ Enable Error Reporting ------------------
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ------------------ PHPMailer Includes ------------------
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// ------------------ Database Configuration ------------------
$db_host = 'localhost';
$db_user = 'u119975290_ifl';
$db_pass = 'A!@P@wered@!fl123';
$db_name = 'u119975290_ifl';

// Email Configuration
$email_user = 'aipoweredifl@gmail.com';
$email_pass = 'aipoweredifl@Aa';

// ------------------ Connect to Database ------------------
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    echo json_encode(['status'=>'error','message'=>'DB Connection Failed: '.$conn->connect_error]);
    exit;
}

// ------------------ Get Email ------------------
$email = $_POST['email'] ?? '';
if (!$email) {
    echo json_encode(['status'=>'error','message'=>'Email is required']);
    exit;
}

// ------------------ Check if User Exists ------------------
$stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
if (!$stmt) {
    echo json_encode(['status'=>'error','message'=>'Prepare failed: '.$conn->error]);
    exit;
}
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(['status'=>'error','message'=>'User not found']);
    exit;
}

// ------------------ Generate OTP ------------------
$otp = rand(100000, 999999);
$expiry = date("Y-m-d H:i:s", strtotime("+5 minutes"));

// ------------------ Update OTP in DB ------------------
$update = $conn->prepare("UPDATE users SET otp_code=?, otp_expires_at=? WHERE email=?");
if (!$update) {
    echo json_encode(['status'=>'error','message'=>'Update Prepare failed: '.$conn->error]);
    exit;
}
$update->bind_param("sss", $otp, $expiry, $email);
$update->execute();

// ------------------ Send OTP via PHPMailer ------------------
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->SMTPDebug = 2; // Enable verbose debug output
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $email_user;
    $mail->Password = $email_pass;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom($email_user, 'AI Powered App');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Your OTP Code';
    $mail->Body = "Your OTP is: <b>$otp</b>. It is valid for 5 minutes.";

    $mail->send();
    echo json_encode(['status'=>'success','message'=>'OTP sent to email']);
} catch (Exception $e) {
    echo json_encode(['status'=>'error','message'=>'Mailer Error: '.$mail->ErrorInfo]);
}
?>
