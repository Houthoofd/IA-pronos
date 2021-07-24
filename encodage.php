
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

  <div class="encodage__container__table">
    <h3>Résultas</h3>
    <table>
      <thead>
        <tr>
          <td>N°</td>
          <td>Date</td>
          <td>Evènement</td>
          <td>Sport</td>
          <td>Côte</td>
          <td>Mise</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody id="result-row"></tbdoy>
      </tbody>
    </table>
  </div>

  </body>
  <script src="js.js"></script>
  <script src="caches.js"></script>
  </html>


<?php

$event = ($_POST["event"]);
$sport = ($_POST["sport"]);
$date = ($_POST["date"]);
$cote = ($_POST["cote"]);
$mise = ($_POST["mise"]);
$status = ($_POST["status"]);


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
  $conn = new PDO('mysql:host=localhost;dbname=ia-pronos', 'root', '');
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "connection réussie";

  if(isset($_POST['encoder']))
  {
    $sql = "INSERT INTO paris_encoder (date_, event, sport, cote, mise, status)
    VALUES ('$event', '$sport', '$cote', '$cote', '$mise', '$status')";
    $conn->exec($sql);
    echo "New record created successfully";
  }

} catch(PDOException $e) {
  echo "Connection échoué: " . $e->getMessage();
}

$conn = null;
?>