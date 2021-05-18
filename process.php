<?php
$mysqli = new mysqli('localhost', 'root', '', 'paris_sportifs_db')or die(mysql_error($mysqli));

echo "connexion établie";

if(isset($_POST['encoder']))
{
  $id = $id + 1;
  $event = ($_POST["event"]);
  $sport = ($_POST["sport"]);
  $date = ($_POST["date"]);
  $cote = ($_POST["cote"]);
  $mise = ($_POST["mise"]);
  $status = ($_POST["status"]);

  echo $id,$event,$sport,$date,$cote,$mise,$status;

  $mysqli->querry("INSERT INTO paris_encoder (id,date_,sport,cote,mise,status) VALUES('$id','$date_','$event','$sport','$cote','$mise','$status')");

}

?>
