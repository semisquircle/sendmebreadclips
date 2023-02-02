<?php
header('Access-Control-Allow-Origin: *');
ini_set('display_errors', 1); 
error_reporting(E_ALL);

$name = $_REQUEST['name'];
$email = $_REQUEST['email'];
$numClips = $_REQUEST['numClips'];

$to = "shawngallagher04@gmail.com";

$subject = "someone wants to send you bread clips";

$message = "
name: $name<br>
email: $email<br>
wants to send $numClips clips
";

$headers  = "From: $name <$name@sendmebreadclips.com>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "X-Priority: 1\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=iso-8859-1\r\n";

mail($to, $subject, $message, $headers);
?>