<?php

$to = "shawngallagher04@gmail.com";

$subject = "My subject";

$message = "First line of text\nSecond line of text";

$headers = "From: The Sender Name <sender@johnmorrisonline.com>\r\n";
$headers .= "Reply-To: replyto@johnmorrisonline.com\r\n";
$headers .= "Content-type: text/html\r\n"

mail($to, $subject, $message, $headers);

?>