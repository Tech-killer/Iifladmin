<?php
header('Content-Type: application/json');

// ------------------ Database Configuration ------------------
$db_host = 'localhost';
$db_user = 'u119975290_ifl';
$db_pass = 'A!@P@wered@!fl123';
$db_name = 'u119975290_ifl';

// Connect to database
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) die(json_encode(['status'=>'error','message'=>$conn->connect_error]));

// ------------------ Get Email & OTP ------------------
$email = $_POST['email'] ?? '';
$otp_input = $_POST['otp'] ?? '';

if (!$email || !$otp_input) {
    echo json_encode(['status' => 'error', 'message' => 'Email and OTP are required']);
    exit;
}

// ------------------ Verify OTP ------------------
$stmt = $conn->prepare("SELECT * FROM users WHERE email=? AND otp_code=?");
$stmt->bind_param("ss", $email, $otp_input);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid OTP']);
    exit;
}

$user = $result->fetch_assoc();
$now = date("Y-m-d H:i:s");
if ($now > $user['otp_expires_at']) {
    echo json_encode(['status' => 'error', 'message' => 'OTP expired']);
    exit;
}

// ------------------ Clear OTP from DB ------------------
$update = $conn->prepare("UPDATE users SET otp_code=NULL, otp_expires_at=NULL WHERE email=?");
$update->bind_param("s", $email);
$update->execute();

// ------------------ Return Role Info ------------------
echo json_encode([
    'status' => 'success',
    'message' => 'OTP verified',
    'role' => $user['role']
]);
?>
