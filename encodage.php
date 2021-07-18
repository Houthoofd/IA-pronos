
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
  <?php
  //On écrit un premier texte dans notre fichier
  file_put_contents('datas.txt', 'Ecriture dans un fichier');

  //On récupère le contenu du fichier
  $texte = file_get_contents('datas.txt');

  //On ajoute notre nouveau texte à l'ancien
  $texte .= "\n**NOUVEAU TEXTE**";

  //On écrit tout le texte dans notre fichier
  file_put_contents('datas.txt', $id + 1 . ' ' . $event);
?>

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
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "paris_sportifs_db";

$event = ($_POST["event"]);
$sport = ($_POST["sport"]);
$date = ($_POST["date"]);
$cote = ($_POST["cote"]);
$mise = ($_POST["mise"]);
$status = ($_POST["status"]);
$datas = array(
  array("N°"),
  array("Date"),
  array("Event"),
  array("Sport"),
  array("Cote"),
  array("Mise"),
  array("Status"),
);
array_push($datas[0],$event);
array_push($datas[1],$date);
array_push($datas[2],$sport);
array_push($datas[3],$cote);
array_push($datas[4],$mise);
array_push($datas[5],$status);
//print_r($datas);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  if(!$conn)
  {
    echo "Connected successfully";
    if(isset($_POST['encoder']))
    {
      $sql = "INSERT INTO paris_encoder (date_, event, sport, cote, mise, status)
      VALUES ('$event', '$sport', '$cote', '$cote', '$mise', '$status')";
      $conn->exec($sql);
      echo "New record created successfully";
    }
  }

} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>
