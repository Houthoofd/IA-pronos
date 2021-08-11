<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <link rel="stylesheet" href="css.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <meta charset="utf-8">
    <title>IA Pronos</title>
  </head>
  <body>
  <?php include 'components/header.php'; ?>
  <?php include 'components/navbar.php'; ?>

  <div class="dashboard__container">

  </div>
  </body>
  <script src="js.js"></script>
</html>


<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


try {
  $conn = new PDO('mysql:host=localhost;dbname=ia-pronos', 'root', '');
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "connection réussie";

  // Querry servant à rechercher les données dans la base de données et de les afficher //
  $stmt = $conn->prepare ("SELECT status FROM paris_encoder");
  $stmt->execute();

  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  $result = $stmt->fetchAll();

  $valides = array();
  $echecs = array();
  $total = count($result);

  foreach ($result as $key => $statuss) {
      $status = implode($statuss);
      if($status == "Validé"){
        array_push($valides,$status);
      }

      if($status == "Echec"){
        array_push($echecs,$status);
      }
  }

  echo "<div id='statistiques'>
          <div id='paris_gagnés'>" .count($valides). "/" . "{$total}" . " " . "validés" . "</div>
          <div id='paris_perdus'>" .count($echecs). "/" . "{$total}" . " " . "perdus" . "</div>
        </div>";

  // echo "{$key}" . " " . "{$status}";

} catch(PDOException $e) {
  echo "Connection échoué: " . $e->getMessage();
}

$conn = null;
?>
