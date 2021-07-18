
<?php

include 'components/header.php';
include 'components/navbar.php';
include 'classes.php';

$bdd = new PDO('mysql:host=127.0.0.1;dbname=test','root', '');

//echo "connexion établie";

$id = 0;
$event = ($_POST["event"]);
$sport = ($_POST["sport"]);
$date = ($_POST["date"]);
$cote = ($_POST["cote"]);
$mise = ($_POST["mise"]);
$status = ($_POST["status"]);

if(isset($_POST['encoder']))
{

$id_ = $id + 1;
$pari = new Pari($id_,$event,$sport,$date,$cote,$mise,$status);

$pari->AddToHTML($id_,$event,$sport,$date,$cote,$mise,$status);
$requete = $bdd->exec("INSERT INTO paris_encoder (id,date_,sport,cote,mise,status) VALUES('$id_','$date_','$event','$sport','$cote','$mise','$status')");

echo "<p class='msg'>Données envoyées<p>";
}

?>
