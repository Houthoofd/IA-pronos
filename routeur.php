<?php

$path = dirname(__FILE__);
$req = json_decode(file_get_contents('php://input'));


if($req -> type == "get"){

  $chanel = $req -> chanel;
  $data = $req -> data;

}

if($req -> type == "post"){

  $chanel = $req -> chanel;
  $data = $req -> data;
  $id = $req -> data -> id;

  if($chanel == 'supprimer_paris'){

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ia-pronos";

  try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // sql to delete a record
  $sql = "DELETE FROM paris_encoder WHERE id=$id";

  // use exec() because no results are returned
  $conn->exec($sql);
  echo "Record deleted successfully";
  } catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
  }

  $conn = null;
  }

}

?>
