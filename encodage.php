
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
  <?php include 'files/outils.php'; ?>
  <div class="encodage__container">
    <h3>Encoder vos paris</h3>
    <form method="post">
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="event" placeholder="Evènement"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="date" placeholder="Date"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="sport" placeholder="Sport"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="cote" placeholder="Côte"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="mise" placeholder="Mise"></br>
      </div>
      <div class="encodage__container__input">
        <label for="event"></label>
        <input type="text" class="input-form" name="status" placeholder="Status"></br>
      </div>
      <button type="submit" name="encoder" id="sub_btn">Encoder</button>
    </form>
  </div>
  </body>
  <script src="./js.js"></script>
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
  $stmt = $conn->prepare ("SELECT id, date_, event, sport, cote, mise, status FROM paris_encoder");
  $stmt->execute();

  $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
  $result = $stmt->fetchAll();

  // print_r($result);
  echo '<div id = "tableMatch">';
  foreach ($result as $idMatch => $match) {
    echo '<div id = '.$idMatch.' class = "match">';
    foreach ($match as $field => $data) {
      echo '<div class="'.$field.'">'.$data.'</div>';
    }
      echo "<div class='buttons'><button>Modifier</button><button onClick=routeur.post(Supprimer(this),"."'supprimer_paris'".")>Supprimer</button></div>";
    echo '</div>';
  }
  echo '</div>';


  if(isset($_POST['encoder']))
  {
    $event = ($_POST["event"]);
    $sport = ($_POST["sport"]);
    $date = ($_POST["date"]);
    $cote = ($_POST["cote"]);
    $mise = ($_POST["mise"]);
    $status = ($_POST["status"]);

    // Envoie des données à la base de donnéees //
    $sql = "INSERT INTO paris_encoder (date_, event, sport, cote, mise, status)
    VALUES ('$event', '$sport', '$cote', '$cote', '$mise', '$status')";
    $conn->exec($sql);
    echo "New record created successfully";

    // Querry servant à rechercher les données dans la base de données et de les afficher //
    $stmt = $conn->prepare ("SELECT id, date_, event, sport, cote, mise, status FROM paris_encoder");
    $stmt->execute();


    // $last_id = $stmt->lastInsertId();
    // echo $last_id;


  }


} catch(PDOException $e) {
  echo "Connection échoué: " . $e->getMessage();
}

$conn = null;
?>
