<?php

$bdd = new PDO('mysql:host=127.0.0.1;dbname=paris_sportifs_db','root', '');

echo $_POST['register'];


if(isset($_POST['register']))
{
  $name = ($_POST["nom"]);
  $prenom = ($_POST["prenom"]);
  $pseudo = ($_POST["pseudo"]);
  $mail = ($_POST["mail"]);
  $phone = ($_POST["phone"]);
  $password = ($_POST["password"]);
  $confirm_psw = ($_POST["confirme_password"]);

  echo $name;

  $requete = $bdd->exec("INSERT INTO user (name) VALUES('$name')");

  // $requete = $bdd->exec("INSERT INTO user (name,prenom,pseudo,mail,phone,password,conf_password) VALUES('$name','$prenom','$pseudo','$mail','$phone','$password','$confirm_psw')");

}
?>
