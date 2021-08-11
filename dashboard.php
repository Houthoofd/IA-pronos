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
  $stmt = $conn->prepare ("SELECT status, sport, cote, mise FROM paris_encoder");
  $stmt->execute();

  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  $result = $stmt->fetchAll();


  $valides = array(); // tableau servant à stocker les paris gagnants //
  $echecs = array(); // tableau servant à stocker les paris perdants //
  $football = array(); // tableau servant à stocker les paris concernant le football //
  $tennis = array(); // tableau servant à stocker les paris concernant le tennis //
  $basketball = array(); // tableau servant à stocker les paris concernant le basket //
  $hockey = array(); // tableau servant à stocker les paris concernant le hockeyt //
  $total_paris = count($result); // totalité des paris encodés //


  foreach ($result as $key => $sports) {
    $sport = implode($sports);
    if($sport == 'football'){array_push($football,$status);}
    if($sport == 'tennis'){array_push($tennis,$status);}
    if($sport == 'basketball'){array_push($basketball,$status);}
    if($sport == 'hockey'){array_push($hockey,$status);}
  }

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
          <div id='paris_gagnés'>" .count($valides). "/" . "{$total_paris}" . " " . "validés" . "</div>
          <div id='paris_perdus'>" .count($echecs). "/" . "{$total_paris}" . " " . "perdus" . "</div>
            <div id='catégories'>
              <div id='football'>
                  <div id='foot_paris_gagnés'>" .count($football). "/" . "{$total_paris}" . " " . "paris sur le football validés" . "</div>
                  <div id='foot_paris_perdus'>" .count($football). "/" . "{$total_paris}" . " " . "paris sur le football perdus" . "</div>
                  </div>
              <div id='tennis'>
                  <div id='tennis_paris_gagnés'>" .count($tennis). "/" . "{$total_paris}" . " " . "paris sur le tennis validés" . "</div>
                  <div id='tennis_paris_perdus'>" .count($tennis). "/" . "{$total_paris}" . " " . "paris sur le tennis perdus" . "</div>
                  </div>
              <div id='basketball'>
                  <div id='tennis_paris_gagnés'>" .count($basketball). "/" . "{$total_paris}" . " " . "paris sur le basket validés" . "</div>
                  <div id='tennis_paris_perdus'>" .count($basketball). "/" . "{$total_paris}" . " " . "paris sur le basket perdus" . "</div>
                    </div>
              <div id='tennis'>
                  <div id='tennis_paris_gagnés'>" .count($hockey). "/" . "{$total_paris}" . " " . "paris sur le hockey validés" . "</div>
                  <div id='tennis_paris_perdus'>" .count($hockey). "/" . "{$total_paris}" . " " . "paris sur le hockey perdus" . "</div>
                    </div>
                </div>
        </div>";

  // echo "{$key}" . " " . "{$status}";

} catch(PDOException $e) {
  echo "Connection échoué: " . $e->getMessage();
}

$conn = null;
?>
