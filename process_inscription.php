<?php
$mysqli = new mysqli('localhost', 'root', '', 'paris_sportifs_db')or die(mysql_error($mysqli));

echo "connexion établie process_inscription";

$name = ($_POST["nom"]);
$prenom = ($_POST["prenom"]);
$pseudo = ($_POST["pseudo"]);
$mail = ($_POST["mail"]);
$phone = ($_POST["phone"]);
$password = ($_POST["password"]);
$confirm_psw = ($_POST["confirme_password"]);

echo $name,$prenom,$pseudo,$mail,$phone,$password,$confirm_psw;

if(isset($_POST['register']))
{
  $name = ($_POST["nom"]);
  $prenom = ($_POST["prenom"]);
  $pseudo = ($_POST["pseudo"]);
  $mail = ($_POST["mail"]);
  $phone = ($_POST["phone"]);
  $password = ($_POST["password"]);
  $confirm_psw = ($_POST["confirme_password"]);

  echo $name,$prenom,$pseudo,$mail,$phone,$password,$confirm_psw;

  $mysqli->querry("INSERT INTO user (name,prenom,pseudo,mail,phone,password,conf_password) VALUES('$name','$prenom','$pseudo','$mail','$phone','$password','$confirm_psw')");

}
?>
