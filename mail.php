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

$headers = "Content-type: text/html\r\n";

mail($to, $subject, $message, $headers);
?>